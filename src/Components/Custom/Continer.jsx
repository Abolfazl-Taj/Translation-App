import Navbar from "../Build/Navbar"

const Continer = ({ children }) => {
    return (
        <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-center items-center px-4">
            <Navbar />
            <div className="my-12 w-full rounded">
                {children}
            </div>
        </div>
    )
}

export default Continer
