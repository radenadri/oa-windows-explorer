import type { Folder } from '../types/folder'

export const mockFolders: Folder[] = [
  {
    id: 1,
    name: 'My Computer',
    parentId: null,
    createdAt: new Date(),
    children: [
      {
        id: 2,
        name: 'C:',
        parentId: 1,
        createdAt: new Date(),
        children: [
          {
            id: 3,
            name: 'Program Files',
            parentId: 2,
            createdAt: new Date(),
            children: [
              {
                id: 4,
                name: 'Adobe',
                parentId: 3,
                createdAt: new Date(),
                children: [],
              },
              {
                id: 5,
                name: 'Microsoft Office',
                parentId: 3,
                createdAt: new Date(),
                children: [],
              },
              {
                id: 6,
                name: 'Common Files',
                parentId: 3,
                createdAt: new Date(),
                children: [],
              },
            ],
          },
          {
            id: 7,
            name: 'Users',
            parentId: 2,
            createdAt: new Date(),
            children: [
              {
                id: 8,
                name: 'Administrator',
                parentId: 7,
                createdAt: new Date(),
                children: [
                  {
                    id: 9,
                    name: 'Documents',
                    parentId: 8,
                    createdAt: new Date(),
                    children: [
                      {
                        id: 10,
                        name: 'Work',
                        parentId: 9,
                        createdAt: new Date(),
                        children: [],
                      },
                      {
                        id: 11,
                        name: 'Personal',
                        parentId: 9,
                        createdAt: new Date(),
                        children: [],
                      },
                    ],
                  },
                  {
                    id: 12,
                    name: 'Downloads',
                    parentId: 8,
                    createdAt: new Date(),
                    children: [],
                  },
                  {
                    id: 13,
                    name: 'Pictures',
                    parentId: 8,
                    createdAt: new Date(),
                    children: [
                      {
                        id: 14,
                        name: 'Vacation 2024',
                        parentId: 13,
                        createdAt: new Date(),
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: 15,
                name: 'Public',
                parentId: 7,
                createdAt: new Date(),
                children: [],
              },
            ],
          },
          {
            id: 16,
            name: 'Windows',
            parentId: 2,
            createdAt: new Date(),
            children: [
              {
                id: 17,
                name: 'System32',
                parentId: 16,
                createdAt: new Date(),
                children: [],
              },
              {
                id: 18,
                name: 'Temp',
                parentId: 16,
                createdAt: new Date(),
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 19,
        name: 'D:',
        parentId: 1,
        createdAt: new Date(),
        children: [
          {
            id: 20,
            name: 'Games',
            parentId: 19,
            createdAt: new Date(),
            children: [],
          },
          {
            id: 21,
            name: 'Media',
            parentId: 19,
            createdAt: new Date(),
            children: [
              {
                id: 22,
                name: 'Movies',
                parentId: 21,
                children: [],
                createdAt: new Date(),
              },
              {
                id: 23,
                name: 'Music',
                parentId: 21,
                children: [],
                createdAt: new Date(),
              },
            ],
          },
        ],
      },
    ],
  },
]
