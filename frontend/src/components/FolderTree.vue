<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Folder, FolderTreeNode } from '@shared/types/folder'

interface Props {
  folders: Folder[]
  selectedFolderId: number | null
}

interface Emits {
  (e: 'select', folderId: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const openFolders = ref<Set<number>>(new Set())

watch(
  () => props.folders,
  (folders) => {
    if (!folders?.length || openFolders.value.size > 0) {
      return
    }

    const firstFolder = folders[0]
    if (firstFolder) {
      openFolders.value = new Set([firstFolder.id])
      selectFolder(firstFolder.id)
    }
  },
)

const flattenedTree = computed<FolderTreeNode[]>(() => {
  const result: FolderTreeNode[] = []

  const traverse = (folders: Folder[], level: number = 0) => {
    for (const folder of folders) {
      const isOpen = openFolders.value.has(folder.id)
      result.push({
        ...folder,
        isOpen,
        level,
      })

      if (isOpen && folder.children && folder.children.length > 0) {
        traverse(folder.children, level + 1)
      }
    }
  }

  traverse(props.folders)
  return result
})

const toggleFolder = (folderId: number) => {
  if (openFolders.value.has(folderId)) {
    openFolders.value.delete(folderId)
  } else {
    openFolders.value.add(folderId)
  }
}

const selectFolder = (folderId: number) => {
  emit('select', folderId)
}

const hasChildren = (folder: Folder): boolean => {
  return !!folder.children && folder.children.length > 0
}
</script>

<template>
  <div class="folder-tree">
    <div
      v-for="node in flattenedTree"
      :key="node.id"
      class="folder-item"
      :class="{ selected: node.id === selectedFolderId }"
      :style="{ paddingLeft: `${node.level * 16 + 4}px` }"
      @click="selectFolder(node.id)"
    >
      <span v-if="hasChildren(node)" class="toggle-icon" @click.stop="toggleFolder(node.id)">
        {{ node.isOpen ? '▼' : '▶' }}
      </span>
      <span v-else class="toggle-icon-placeholder"></span>
      <span class="folder-icon">📁</span>
      <span class="folder-name">{{ node.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.folder-tree {
  height: 100%;
  overflow-y: auto;
  background: white;
  user-select: none;
}

.folder-item {
  display: flex;
  align-items: center;
  padding: 2px 4px;
  cursor: pointer;
  white-space: nowrap;
}

.folder-item:hover {
  background: #e0e0e0;
}

.folder-item.selected {
  background: #0a246a;
  color: white;
}

.toggle-icon {
  display: inline-block;
  width: 16px;
  font-size: 10px;
  cursor: pointer;
  text-align: center;
}

.toggle-icon-placeholder {
  display: inline-block;
  width: 16px;
}

.folder-icon {
  margin: 0 4px;
  font-size: 14px;
}

.folder-name {
  font-size: 11px;
  font-family: 'Tahoma', sans-serif;
}
</style>
