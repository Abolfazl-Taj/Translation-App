import Search from "../Components/Build/Search"
import Continer from "../components/Custom/Continer"
import useTheme from "../Hooks/useTheme"

const Words = () => {
    const { theme } = useTheme()
    return (
        <Continer>
            <div className={`w-full px-4 py-8 rounded-xl shadow-xl  border  flex flex-col gap-6 ${theme === "dark" ? "bg-zinc-900 border-zinc-950" : "border-blue-200 bg-white shadow-blue-100"}`}>
                <Search />

            </div>

        </Continer>
    )
}

export default Words