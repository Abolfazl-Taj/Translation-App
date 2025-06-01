import { useContext } from "react"
import { ThemContext } from "../Context/ThemContext"

const useTheme = () => {
    const value = useContext(ThemContext)
    if (!value) {
        throw new Error("Theme is undifind")
    }
    return value
}

export default useTheme