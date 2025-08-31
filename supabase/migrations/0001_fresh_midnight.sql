CREATE TABLE "communities" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"ownerId" uuid NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "communities_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DROP TABLE "profiles" CASCADE;--> statement-breakpoint
ALTER TABLE "communities" ADD CONSTRAINT "communities_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;