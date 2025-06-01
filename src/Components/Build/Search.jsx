import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaBook } from "react-icons/fa6";

const Search = () => {
    return (
        <div className="flex w-full items-center justify-between gap-6 py-4 px-6 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 backdrop-blur-md rounded-xl shadow-2xl border border-zinc-600/30">
            {/* Left Section - Library */}
            <section className="flex items-center gap-3 py-3 px-5 rounded-lg bg-zinc-900/50 hover:bg-zinc-900/80 transition-all duration-300 shadow-md group cursor-pointer">
                <span className="text-3xl text-blue-400 group-hover:scale-110 transition-transform duration-200">
                    <FaBook />
                </span>
                <div className="text-left">
                    <h2 className="font-extrabold text-white text-lg tracking-wide">Words Library</h2>
                    <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">Explore wisdom</p>
                </div>
            </section>

            {/* Search Input */}
            <section className="flex flex-grow items-center bg-black/40 border border-zinc-600 rounded-lg overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/80 transition-shadow duration-300 shadow-inner">
                <input
                    type="text"
                    className="flex-grow py-3 px-5 bg-transparent outline-none text-white placeholder-zinc-400 text-sm md:text-base"
                    placeholder="Type at least 2 words to search..."
                />
                <div className="flex items-center justify-center h-full px-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <HiMagnifyingGlass className="text-white text-xl" />
                    </span>
                </div>
            </section>
        </div>
    );
};

export default Search;