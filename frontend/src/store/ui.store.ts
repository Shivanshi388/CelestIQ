import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  isLayerMenuOpen: boolean;
  toggleLayerMenu: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      isLayerMenuOpen: false,
      toggleLayerMenu: () => set((state) => ({ isLayerMenuOpen: !state.isLayerMenuOpen })),
    }),
    {
      name: 'ui-storage', // name of item in the storage (must be unique)
      partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }), // only persist isSidebarOpen
    }
  )
);
