import { useEffect, createContext, useContext, useCallback } from 'react'
import { useSettingsStore } from '../stores/settingsStore'

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
  const theme = useSettingsStore((s) => s.theme)
  const toggleTheme = useSettingsStore((s) => s.toggleTheme)
  const setTheme = useSettingsStore((s) => s.setTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  const toggle = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  const set = useCallback((t) => {
    setTheme(t)
  }, [setTheme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggle, setTheme: set }}>
      {children}
    </ThemeContext.Provider>
  )
}