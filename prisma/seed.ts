import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
  const adminName = process.env.SEED_ADMIN_NAME ?? "Admin User";
  const demoEmail = process.env.SEED_DEMO_EMAIL ?? "demo@example.com";
  const demoName = process.env.SEED_DEMO_NAME ?? "Demo User";

  // NOTE: better-auth uses its own password hashing (argon2 or bcrypt).
  // The seed creates users directly in the DB bypassing better-auth's hash.
  // For production, prefer creating seed users via better-auth's API or CLI.
  // Seeded users have no password, so they cannot sign in with credentials.
  // Instead, seed ONLY if the user doesn't exist, then use the app to set passwords.
  //
  // PRACTICAL APPROACH: We upsert users without passwords (emailVerified = true),
  // and use the forgot-password flow to set a password on first login.
  // For dev convenience, we also create account records with a hashed password
  // using a placeholder that signals "seed user — reset password on first login".

  // Upsert admin user
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      emailVerified: true,
      role: "admin",
    },
  });

  // Create admin account with password
  // We store a marker password. In real usage, better-auth stores argon2-hashed passwords.
  // For actual better-auth compatibility, run: npx @better-auth/cli create-admin
  await prisma.account.upsert({
    where: {
      accountId_providerId: {
        accountId: adminUser.id,
        providerId: "credential",
      },
    },
    update: {},
    create: {
      accountId: adminUser.id,
      providerId: "credential",
      userId: adminUser.id,
      // Password must be set via the app UI or better-auth CLI for real usage.
      // This seed just creates the user record.
      password: null,
    },
  });

  console.log(`✅ Admin user: ${adminEmail}`);

  // Upsert demo user
  const demoUser = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      email: demoEmail,
      name: demoName,
      emailVerified: true,
      role: "user",
    },
  });

  await prisma.account.upsert({
    where: {
      accountId_providerId: {
        accountId: demoUser.id,
        providerId: "credential",
      },
    },
    update: {},
    create: {
      accountId: demoUser.id,
      providerId: "credential",
      userId: demoUser.id,
      password: null,
    },
  });

  console.log(`✅ Demo user: ${demoEmail}`);

  console.log("");
  console.log("📝 NOTE: Seeded users have no password set.");
  console.log("   Use the app's sign-up flow or forgot-password to set passwords.");
  console.log("   Or use the Better Auth CLI: npx @better-auth/cli create-admin");
  console.log("");
  console.log("🌱 Seed complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
