import 'dotenv/config'

import { db, pgPool } from './config/database'
import { folders, type NewFolder } from './models/folder'
import { mockFolders } from '@shared/data/mockFolders'
import type { Folder as SharedFolder } from '@shared/types/folder'

const flattenFolders = (nodes: SharedFolder[]): NewFolder[] => {
  const result: NewFolder[] = []

  const traverse = (items: SharedFolder[]) => {
    for (const item of items) {
      const { id, name, parentId, children } = item
      result.push({
        id,
        name,
        parentId: parentId ?? null,
      } satisfies NewFolder)

      if (children && children.length > 0) {
        traverse(children)
      }
    }
  }

  traverse(nodes)
  return result
}

async function seed() {
  const flatFolders = flattenFolders(mockFolders)

  await db.delete(folders)
  await db.insert(folders).values(flatFolders)
}

seed()
  .then(async () => {
    console.log('Seed completed successfully')
    await pgPool.end()
  })
  .catch(async (error) => {
    console.error('Seed failed:', error)
    await pgPool.end()
    process.exit(1)
  })
