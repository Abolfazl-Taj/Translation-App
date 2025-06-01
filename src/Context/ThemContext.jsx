import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const ThemContext = createContext(null)
const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const storeTheme = localStorage.getItem("theme")
        return storeTheme ? storeTheme : "light"
    })
    const changeTheme = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark")
    }
    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])
    return (
        <ThemContext.Provider value={{ theme, changeTheme }} >{children}</ThemContext.Provider>
    )
}

export default ThemeContextProvider