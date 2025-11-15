import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

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
        children: [{
          id: 3,
          name: 'Program Files',
          parentId: 2,
          createdAt: '2024-11-16T10:00:00Z',
          children: [],
        }],
      },
    ],
  },
]

describe('App', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', 'http://localhost:6700')
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFolders),
      }),
    ))
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('renders explorer layout and loads folders from API', async () => {
    const wrapper = mount(App)

    await flushPromises()

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:6700/api/v1/folders')
    expect(wrapper.text()).toContain('Windows Explorer')
  })
})
