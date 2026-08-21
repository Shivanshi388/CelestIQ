import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  isLayerMenuOpen: boolean;
  toggleLayerMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  isLayerMenuOpen: false,
  toggleLayerMenu: () => set((state) => ({ isLayerMenuOpen: !state.isLayerMenuOpen })),
}));
