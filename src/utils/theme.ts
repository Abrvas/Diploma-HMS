// Initialize theme based on system preference or stored value
const initializeTheme = () => {
  // Check if theme was previously stored
  const storedTheme = localStorage.getItem('theme-storage');
  if (storedTheme) {
    const { state } = JSON.parse(storedTheme);
    if (state.isDark) {
      document.documentElement.classList.add('dark');
    }
    return;
  }
  
  // Otherwise use system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
};

// Initialize theme immediately
if (typeof window !== 'undefined') {
  initializeTheme();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const storedTheme = localStorage.getItem('theme-storage');
    // Only update if user hasn't manually set a theme
    if (!storedTheme) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}

export {};