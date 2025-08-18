CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;