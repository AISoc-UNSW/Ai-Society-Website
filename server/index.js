/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const PORT = process.env.PORT || 5008;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

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
