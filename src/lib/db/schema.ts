import {pgTable, uuid, text, numeric, boolean, timestamp} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    code: text('code').notNull().unique(),
    price: numeric('price').notNull(),
    unit: text('unit').notNull(),
    is_available: boolean('is_available').default(true),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const lpgSizes = pgTable('lpg_sizes', {
    id: uuid('id').primaryKey().defaultRandom(),
    size_kg: numeric('size_kg').notNull(),
    price: numeric('price').notNull(),
    is_available: boolean('is_available').default(true),
    updated_at: timestamp('updated_at').defaultNow().notNull()
})