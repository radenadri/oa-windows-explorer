<script setup lang="ts">
import type { Folder } from '@shared/types/folder'

interface Props {
  subfolders: Folder[]
}

defineProps<Props>()
</script>

<template>
  <div class="folder-list">
    <div v-if="subfolders.length === 0" class="empty-message">No folders found</div>
    <div v-else class="folder-grid">
      <div v-for="folder in subfolders" :key="folder.id" class="folder-card">
        <div class="folder-icon-large">📁</div>
        <div class="folder-label">{{ folder.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.folder-list {
  height: 100%;
  overflow-y: auto;
  background: white;
  padding: 8px;
}

.empty-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 11px;
  font-family: 'Tahoma', sans-serif;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
  padding: 8px;
}

.folder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 2px;
}

.folder-card:hover {
  background: #e0e0e0;
}

.folder-icon-large {
  font-size: 48px;
  margin-bottom: 4px;
}

.folder-label {
  font-size: 11px;
  font-family: 'Tahoma', sans-serif;
  text-align: center;
  word-break: break-word;
  max-width: 100%;
}
</style>
