<script setup lang="ts">
import { useFolders } from '@/composables/useFolders'
import FolderTree from '@/components/FolderTree.vue'
import FolderList from '@/components/FolderList.vue'
import { onMounted } from 'vue'

const { fetchFolders, folders, selectedFolderId, selectedFolderChildren, selectFolder } =
  useFolders()

onMounted(async () => {
  await fetchFolders()
})
</script>

<template>
  <div class="app-container">
    <div class="window">
      <div class="title-bar">
        <div class="title-bar-text">Windows Explorer</div>
        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body">
        <div class="explorer-container">
          <div class="panel left-panel">
            <div class="panel-title">Folders</div>
            <div class="panel-content">
              <FolderTree
                :folders="folders || []"
                :selected-folder-id="selectedFolderId"
                @select="selectFolder"
              />
            </div>
          </div>
          <div class="separator"></div>
          <div class="panel right-panel">
            <div class="panel-title">Contents</div>
            <div class="panel-content">
              <FolderList :subfolders="selectedFolderChildren" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  /* background: #008080; */
  background: #171717;
  padding: 20px;
  box-sizing: border-box;
}

.window {
  width: 100%;
  max-width: 1200px;
  height: 100%;
  max-height: 800px;
  display: flex;
  flex-direction: column;
}

.window-body {
  flex: 1;
  overflow: hidden;
  padding: 2px;
}

.explorer-container {
  display: flex;
  height: 100%;
  gap: 0;
}

.panel {
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #dfdfdf #808080 #808080 #dfdfdf;
}

.left-panel {
  flex: 0 0 300px;
  min-width: 200px;
}

.right-panel {
  flex: 1;
  min-width: 300px;
}

.separator {
  width: 4px;
  background: #c0c0c0;
  cursor: col-resize;
}

.panel-title {
  background: #000080;
  color: white;
  padding: 2px 4px;
  font-size: 11px;
  font-family: 'Tahoma', sans-serif;
  font-weight: bold;
}

.panel-content {
  flex: 1;
  overflow: hidden;
  border: 2px solid;
  border-color: #808080 #dfdfdf #dfdfdf #808080;
}
</style>
