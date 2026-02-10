import crypto from "node:crypto";

const algorithm = "aes-256-cbc";
const secretKey = process.env.CRYPT_SECRET; // Use a secure 32-byte key
// In a real application, get the key from a secure environment variable

function encrypt(text) {
  const iv = crypto.randomBytes(16); // Generate a unique IV for each encryption
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  // Return IV and encrypted data combined
  return iv.toString("hex") + encrypted;
}

// Example Usage:
// const encryptedData = encrypt("Sensitive info");
// process.env.CRYPT_SECRET;