import { pgTable, text, timestamp, serial, integer, foreignKey } from 'drizzle-orm/pg-core'

export const folders = pgTable(
  'folders',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    parentId: integer('parent_id').references(() => folders.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    parentReference: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: 'folders_parent_id_fkey',
    }).onDelete('set null'),
  }),
)

export type Folder = typeof folders.$inferSelect
export type NewFolder = typeof folders.$inferInsert
