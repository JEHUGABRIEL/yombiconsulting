/**
 * Simple SHA-256 hash function for admin password verification.
 * Uses the Web Crypto API (available in modern browsers).
 */
export async function createHash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
