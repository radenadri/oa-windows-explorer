export interface Folder {
  id: number
  name: string
  parentId: number | null
  children?: Folder[]
  createdAt: Date | null
}

export interface FolderTreeNode extends Folder {
  isOpen: boolean
  level: number
}
