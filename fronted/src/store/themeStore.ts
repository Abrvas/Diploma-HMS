import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

// Initialize theme based on system preference
const getInitialTheme = () => {
  // Check if theme was previously stored
  const storedTheme = localStorage.getItem('theme-storage');
  if (storedTheme) {
    const { state } = JSON.parse(storedTheme);
    return state.isDark;
  }
  
  // Otherwise use system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Apply theme to document with transition lock
const applyTheme = (isDark: boolean) => {
  // Prevent transition flicker by adding class before DOM update
  document.documentElement.classList.add('theme-transitioning');
  
  // Apply theme
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Remove transition lock after animation completes
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 400); // Match the CSS transition duration
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: getInitialTheme(),
      toggleTheme: () => {
        set((state) => {
          const newIsDark = !state.isDark;
          applyTheme(newIsDark);
          return { isDark: newIsDark };
        });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme when storage is rehydrated
        if (state) {
          applyTheme(state.isDark);
        }
      },
    }
  )
);

// Apply initial theme
applyTheme(getInitialTheme());

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const storedTheme = localStorage.getItem('theme-storage');
    // Only update if user hasn't manually set a theme
    if (!storedTheme) {
      applyTheme(e.matches);
    }
  });
}