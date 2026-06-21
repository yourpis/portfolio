import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const p = await prisma.project.create({
      data: {
        title: "Test Test Test",
        slug: "test-test-test-" + Date.now(),
        type: "Project",
        subcategory: "Hardware Engineering",
        status: "Completed",
        content: "Test content",
      }
    });
    console.log("Success:", p.id);
  } catch (e) {
    console.error("Prisma error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
