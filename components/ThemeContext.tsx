import React, { useEffect, useState, createContext, useContext } from 'react'

// createContext
export const ThemeContext = createContext<{ darkMode: boolean; toggleDarkMode: () => void }>({
  darkMode: false,
  toggleDarkMode: () => {},
})

export const ThemeContextProvider = (props: any) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(darkMode)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const value = {
    darkMode,
    toggleDarkMode,
  }
  return <ThemeContext.Provider value={value} {...props} />
}
