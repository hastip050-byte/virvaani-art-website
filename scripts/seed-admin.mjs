import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password) {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
}

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env"
    );
  }

  const hashedPassword = hashPassword(password);

  const admin = await prisma.adminUser.upsert({
    where: {
      email,
    },
    update: {
      password: hashedPassword,
    },
    create: {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
    },
  });

  console.log("Admin account ready:");
  console.log(`Email: ${admin.email}`);
  console.log("Password: [hidden]");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });