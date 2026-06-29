CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipeId" integer NOT NULL,
	"qty" integer,
	"unit" text,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"stepNo" integer NOT NULL,
	"recipeId" integer NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'USER' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;