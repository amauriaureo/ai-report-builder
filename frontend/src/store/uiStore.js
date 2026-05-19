import { create } from 'zustand'

const MOBILE_QUERY = '(max-width: 768px)'

function getInitialCollapsed() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(MOBILE_QUERY).matches
}

export const useUiStore = create((set) => ({
  sidebarCollapsed: getInitialCollapsed(),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
}))
