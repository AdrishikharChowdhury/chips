ALTER TABLE "universities" ALTER COLUMN "university_role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "universities" ALTER COLUMN "university_role" SET DATA TYPE "public"."role" USING "university_role"::text::"public"."role";--> statement-breakpoint
ALTER TABLE "universities" ALTER COLUMN "university_role" SET DEFAULT 'OWNER';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "university_role";--> statement-breakpoint
DROP TYPE "public"."org_role";