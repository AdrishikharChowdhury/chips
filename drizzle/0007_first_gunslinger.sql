CREATE TYPE "public"."org_role" AS ENUM('OWNER', 'MEMBER');--> statement-breakpoint
CREATE TABLE "universities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"university_logo" text NOT NULL,
	"university_role" "org_role" DEFAULT 'OWNER' NOT NULL,
	CONSTRAINT "universities_id_unique" UNIQUE("id"),
	CONSTRAINT "universities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_university_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "university_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "university_slug" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "university_role" "org_role" DEFAULT 'MEMBER';--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_university_slug_universities_slug_fk" FOREIGN KEY ("university_slug") REFERENCES "public"."universities"("slug") ON DELETE no action ON UPDATE no action;