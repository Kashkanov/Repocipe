import {
  pgTable,
  integer,
  serial,
  text,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Role } from '../common/enums/role.enum';

export const roleEnum = pgEnum('role', ['USER', 'ADMIN']);

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipeId')
    .notNull()
    .references(() => recipes.id),
  qty: integer('qty'),
  unit: text('unit'),
  name: text('name').notNull(),
  description: text('description'),
});

export const steps = pgTable('steps', {
  id: serial('id').primaryKey(),
  stepNo: integer('stepNo').notNull(),
  recipeId: integer('recipeId')
    .notNull()
    .references(() => recipes.id),
  description: text('description').notNull(),
});

export const users = pgTable('users', {
  userId: serial('user_id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  role: roleEnum('role').default(Role.USER).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ---- relations ----

export const recipesRelations = relations(recipes, ({ many }) => ({
  ingredients: many(ingredients),
  steps: many(steps),
}));

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}));

export const stepsRelations = relations(steps, ({ one }) => ({
  recipe: one(recipes, {
    fields: [steps.recipeId],
    references: [recipes.id],
  }),
}));
