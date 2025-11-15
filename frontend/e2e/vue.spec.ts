import { test, expect } from '@playwright/test'

const mockFolders = [
  {
    id: 1,
    name: 'My Computer',
    parentId: null,
    createdAt: '2024-11-16T10:00:00Z',
    children: [
      {
        id: 2,
        name: 'C:',
        parentId: 1,
        createdAt: '2024-11-16T10:00:00Z',
        children: [
          {
            id: 3,
            name: 'Program Files',
            parentId: 2,
            createdAt: '2024-11-16T10:00:00Z',
            children: [],
          },
        ],
      },
      {
        id: 19,
        name: 'D:',
        parentId: 1,
        createdAt: '2024-11-16T10:00:00Z',
        children: [],
      },
    ],
  },
]

test.describe('Windows Explorer UI', () => {
  test('displays folder tree and updates contents on selection', async ({ page }) => {
    await page.route('**/api/v1/folders', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockFolders),
      })
    })

    await page.goto('/')

    await expect(page.locator('.title-bar-text')).toHaveText('Windows Explorer')

    const leftPanel = page.locator('.left-panel')
    await expect(leftPanel.getByText('My Computer')).toBeVisible()
    await expect(leftPanel.getByText('C:')).toBeVisible()
    await expect(leftPanel.getByText('D:')).toBeVisible()

    const rightPanel = page.locator('.right-panel')
    await expect(rightPanel.locator('.folder-card').first()).toContainText('C:')
    await expect(rightPanel.locator('.folder-card').nth(1)).toContainText('D:')

    await leftPanel.locator('.folder-item', { hasText: 'C:' }).click()
    await expect(rightPanel.locator('.folder-card').first()).toContainText('Program Files')

    await leftPanel.locator('.folder-item', { hasText: 'C:' }).locator('.toggle-icon').click()
    await expect(leftPanel.getByText('Program Files')).toBeVisible()

    await leftPanel.locator('.folder-item', { hasText: 'Program Files' }).click()
    await expect(rightPanel.getByText('No folders found')).toBeVisible()
  })
})
