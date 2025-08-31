import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const communities = pgTable("communities", {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: text("description"),
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique().notNull(),
  ownerId: uuid("ownerId")
    .references(() => authUsers.id, { onDelete: "cascade" })
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
