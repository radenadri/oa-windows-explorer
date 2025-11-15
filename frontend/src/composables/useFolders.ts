import { ref, computed } from 'vue'
import type { Folder } from '@shared/types/folder'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/api/v1'

export function useFolders() {
  const folders = ref<Folder[]>()
  const selectedFolderId = ref<number | null>(null)

  const fetchFolders = async () => {
    const response = await fetch(`${API_BASE_URL}/folders`)
    const data = await response.json()
    folders.value = data
  }

  // Bikin flat map
  const folderMap = computed<Map<number, Folder>>(() => {
    const map = new Map<number, Folder>()

    const traverse = (folderList: Folder[]) => {
      for (const folder of folderList) {
        map.set(folder.id, folder)
        if (folder.children) {
          traverse(folder.children)
        }
      }
    }

    if (!folders.value) {
      return new Map()
    }

    traverse(folders.value)

    return map
  })

  const selectedFolderChildren = computed<Folder[]>(() => {
    if (!selectedFolderId.value) {
      return []
    }

    const folder = folderMap.value.get(selectedFolderId.value)
    return folder?.children || []
  })

  const selectFolder = (folderId: number) => {
    selectedFolderId.value = folderId
  }

  return {
    fetchFolders,
    folders,
    selectedFolderId,
    selectedFolderChildren,
    selectFolder
  }
}
