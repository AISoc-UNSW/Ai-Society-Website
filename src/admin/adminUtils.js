import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseconfig";

const allowedPattern = /^unswai\.soc\..+@gmail\.com$/;
const allowedTestEmails = new Set([
  "sinsuasti95@gmail.com",
  "partnerships@unswaisoc.com"
]);

export function isAuthorizedEmail(email = "") {
  const normalizedEmail = email.toLowerCase();
  return (
    allowedPattern.test(normalizedEmail) ||
    allowedTestEmails.has(normalizedEmail)
  );
}

export function useAdminAuth() {
  const [state, setState] = useState({
    isLoading: true,
    isAuthorized: false
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const email = user?.email?.toLowerCase() ?? "";

      if (user && isAuthorizedEmail(email)) {
        setState({
          isLoading: false,
          isAuthorized: true
        });
        return;
      }

      if (user) {
        await signOut(auth);
      }

      setState({
        isLoading: false,
        isAuthorized: false
      });
    });

    return unsubscribe;
  }, []);

  return state;
}

export function buildStoragePath(eventId) {
  return `event-banners/${eventId}.webp`;
}

export function getEventStoragePath(event) {
  return event.storagePath || buildStoragePath(event.id);
}

export async function resolveEventImage(event, storage) {
  if (typeof event.image === "string" && /^https?:\/\//i.test(event.image)) {
    return event.image;
  }

  const candidates = buildStorageCandidates(event);

  for (const path of candidates) {
    try {
      return await getDownloadURL(ref(storage, path));
    } catch {
      continue;
    }
  }

  return "";
}

export async function convertImageToWebp(file, quality = 0.82) {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Please upload a valid image file.");
  }

  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Unable to convert image to WebP."));
        }
      },
      "image/webp",
      quality
    );
  });

  const outputName = file.name.replace(/\.[^.]+$/, "") || "event-banner";

  return new File([blob], `${outputName}.webp`, {
    type: "image/webp"
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read image file."));

    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to process image file."));

    image.src = src;
  });
}

function buildStorageCandidates(event) {
  const candidates = new Set();
  const addCandidate = (value) => {
    if (typeof value === "string" && value.trim()) {
      candidates.add(value.trim());
    }
  };

  addCandidate(event.storagePath);

  if (event.id) {
    addCandidate(buildStoragePath(event.id));
  }

  if (event.docId) {
    addCandidate(buildStoragePath(event.docId));
  }

  if (typeof event.image === "string" && event.image.trim() && !/^https?:\/\//i.test(event.image)) {
    const imageValue = event.image.trim();
    addCandidate(imageValue);
    addCandidate(`event-banners/${imageValue}`);
    addCandidate(`event-banners/${imageValue}.webp`);
  }

  return [...candidates];
}
