import { pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  user_id: uuid("user_id")
    .references(() => authUsers.id)
    .notNull(),
  username: text("username"),
});
