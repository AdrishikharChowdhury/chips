import {
  date,
  integer,
  pgEnum,
  real,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "PENDING",
  "BORROWED",
  "RETURNED",
]);

export const usersTable = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").notNull().default("PENDING"),
  role: ROLE_ENUM("role").notNull().default("USER"),
  lastActivityDate: date("last_activity_date").notNull().defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const componentsTable = pgTable("components", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 255 }).notNull(),
  type: text("type").notNull(),
  rating: real("rating").notNull(),
  cover: text("cover").notNull(),
  description: text("description").notNull(),
  totalCopies: integer("total_copies").notNull(),
  availableCopies: integer("available_copies").notNull(),
  summary: text("summary").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  componentId: uuid("component_id")
    .notNull()
    .references(() => componentsTable.id),
  borrowDate: timestamp("borrow_date", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").notNull().default("PENDING").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  amount: integer("amount").notNull().default(1),
});

export const cartItemsTable = pgTable("cart_items", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  componentId: uuid("component_id")
    .notNull()
    .references(() => componentsTable.id),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});