/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const Stripe = require("stripe");
dotenv.config();

const PORT = process.env.PORT || 5008;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
if (!STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY. Payments will not work.");
}
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI. Please set it in your environment.");
  process.exit(1);
}

if (!MONGODB_DB) {
  console.error("Missing MONGODB_DB. Please set it in your environment.");
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedDb = null;

async function getDb() {
  if (cachedDb) return cachedDb;
  await client.connect();
  // Ping to verify connection
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB (ping ok).");
  cachedDb = client.db(MONGODB_DB);
  return cachedDb;
}

const app = express();

const allowedOrigins = [
  "https://www.unswaisoc.com", // production
  "http://localhost:3000", // local dev
  "https://deploy-preview-31--papaya-twilight-4821fe.netlify.app", // preview
  // Add more preview URLs if needed, or use a regex below for all Netlify previews.
];

const corsOptions = {
  origin(origin, callback) {
    // allow empty origin (e.g. Dokploy internal or health check)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await getDb();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e?.message || "db error" });
  }
});

// GET /api/products - list active products
app.get("/api/products", async (req, res) => {
  try {
    const db = await getDb();
    const col = db.collection("products");
    const query = { $or: [{ status: { $exists: false } }, { status: "active" }] };
    const items = await col.find(query).sort({ createdAt: -1 }).toArray();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e?.message || "Failed to fetch products" });
  }
});

// GET /api/products/:id - fetch single product by ObjectId
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing id" });
  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (e) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const db = await getDb();
    const col = db.collection("products");
    const doc = await col.findOne({ _id: objectId });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e?.message || "Failed to fetch product" });
  }
});

// POST /create-checkout-session - create Stripe Checkout session with detailed product info
app.post("/create-checkout-session", async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: "Stripe not configured" });
    const { items, customerEmail, customerName, customerZid } = req.body || {};
    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ error: "No items provided" });
    }

    // Map to Stripe line_items with product information
    const lineItems = items.map((item) => {
      const descriptionParts = [];
      if (item.colour) descriptionParts.push(`Color: ${item.colour}`);
      if (item.size) descriptionParts.push(`Size: ${item.size}`);

      return {
        price_data: {
          currency: "aud",
          product_data: {
            name: item.name || item.productName,
            description: descriptionParts.length > 0 ? descriptionParts.join(" • ") : undefined,
            images: item.img ? [item.img] : undefined, // Include product image
            metadata: {
              product_id: item.id?.toString(),
              colour: item.colour || "",
              size: item.size || "",
            },
          },
          // Stripe expects integer amount in cents
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${FRONTEND_URL}/#cart`, // URL redirect for successful payment
      cancel_url: `${FRONTEND_URL}/#cart`, // URL redirect for cancelled payment
      customer_email: customerEmail,
      customer_creation: "always", // Always create customer for better tracking
      metadata: {
        // Meta data to store customer name and other info
        customer_name: customerName || "",
        customer_zid: customerZid || "",
        total_items: items.length.toString(),
      },
      payment_intent_data: {
        metadata: {
          // NOTE: Whatever change is made to meta data must be made here too
          customer_name: customerName || "",
          customer_zid: customerZid || "",
          total_items: items.length.toString(),
        },
      },
      automatic_tax: { enabled: false },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (e) {
    console.error("Error creating checkout session:", e);
    res.status(500).json({ error: e?.message || "Failed to create session" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  try {
    await client.close();
  } finally {
    process.exit(0);
  }
});
