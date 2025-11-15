import type { Folder } from "@shared/types/folder";

export function buildTree(folders: Folder[]) {
  const map = new Map<number, Folder & { children: Folder[] }>();
  const roots: (Folder & { children: Folder[] })[] = [];

  folders.forEach((folder) => {
    map.set(folder.id, { ...folder, children: [] });
  });

  for (const folder of map.values()) {
    if (folder.parentId) {
      const parent = map.get(folder.parentId);

      if (parent) {
        parent.children.push(folder);
      }
    } else {
      roots.push(folder);
    }
  }

  return roots;
}
