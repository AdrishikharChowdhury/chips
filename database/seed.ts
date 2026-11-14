import net from "node:net";
import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { componentsTable, universitiesTable } from "./schema";
import { sampleComponents } from "../constants";

// Work around Node's address-family autoselection timing out on this host.
net.setDefaultAutoSelectFamily(false);

loadEnv({ path: ".env.local", quiet: true });

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local before seeding.");
  }

  const db = drizzle({ client: neon(databaseUrl) });

  const requestedSlug = process.argv[2];
  const universityColumns = {
    slug: universitiesTable.slug,
    name: universitiesTable.fullName,
  };

  const [university] = requestedSlug
    ? await db
        .select(universityColumns)
        .from(universitiesTable)
        .where(eq(universitiesTable.slug, requestedSlug))
        .limit(1)
    : await db.select(universityColumns).from(universitiesTable).limit(1);

  if (!university) {
    throw new Error(
      requestedSlug
        ? `University with slug "${requestedSlug}" was not found.`
        : "No university found. Create one through sign-up first.",
    );
  }

  const existing = await db
    .select({ title: componentsTable.title })
    .from(componentsTable)
    .where(eq(componentsTable.universitySlug, university.slug));

  const existingTitles = new Set(existing.map((row) => row.title));

  const rows = sampleComponents
    .filter((component) => !existingTitles.has(component.title))
    .map(
      ({
        title,
        manufacturer,
        type,
        rating,
        total_copies,
        available_copies,
        description,
        cover,
        summary,
      }) => ({
        title,
        manufacturer,
        type,
        rating,
        cover,
        description,
        summary,
        totalCopies: total_copies,
        availableCopies: available_copies,
        universitySlug: university.slug,
      }),
    );

  if (rows.length > 0) {
    await db.insert(componentsTable).values(rows);
  }

  console.log(
    `Seeded ${rows.length} component(s) for "${university.name}" (${university.slug}). ` +
      `${existingTitles.size} already existed; ${existingTitles.size + rows.length} total.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
