CREATE TABLE "components" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"type" text NOT NULL,
	"rating" integer NOT NULL,
	"cover" text NOT NULL,
	"description" text NOT NULL,
	"total_copies" integer NOT NULL,
	"available_copies" integer NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "components_id_unique" UNIQUE("id")
);
