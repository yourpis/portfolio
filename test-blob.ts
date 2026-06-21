import { put } from '@vercel/blob';
import dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    const blob = await put("test.txt", "hello world", {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    console.log("Success public:", blob.url);
  } catch (e: any) {
    console.error("Public Error:", e.message);
  }

  try {
    const blob = await put("test.txt", "hello world", {
      access: "private" as any,
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    console.log("Success private:", blob.url);
  } catch (e: any) {
    console.error("Private Error:", e.message);
  }
}
main();
