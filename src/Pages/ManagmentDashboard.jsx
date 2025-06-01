import { useState } from "react";
import TranslationTable from "../Components/Build/TranslationTable";
import Continer from "../components/Custom/Continer";
import { FaBook } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import useTheme from "../Hooks/useTheme";
import useTranslation from "../Hooks/useTranslation";

const ManagmentDashboard = () => {
    const { theme } = useTheme();
    const { keywords } = useTranslation()
    const [isadding, setisadding] = useState(false);

    return (
        <Continer>
            <div className={`w-full px-4 py-8 rounded-xl shadow-xl ${theme === 'dark' ? 'bg-zinc-900 text-white shadow-zinc-700 border-zinc-600' : 'bg-white text-gray-800 shadow-blue-100 border-blue-200'} flex flex-col gap-6`}>
                <div className="mb-8">
                    {/* Main Header */}
                    <div className={`flex flex-col sm:flex-row items-end justify-between pb-3 border-b ${theme === 'dark' ? 'border-zinc-600' : 'border-blue-100'}`}>
                        {/* Title with Icon */}
                        <div className="flex items-center gap-3 mb-4 sm:mb-0">
                            <div className={`bg-blue-600 p-4 text-white text-2xl rounded-lg shadow-sm`}>
                                <FaBook />
                            </div>
                            <h1 className="text-2xl font-bold">
                                <span className="text-blue-600">Dictionary</span>
                                <span className="font-medium text-gray-600"> Management</span>
                            </h1>
                        </div>

                        {/* Counter */}
                        <span className={`hidden sm:inline-block mb-1 px-3 py-1 ${theme === 'dark' ? 'bg-zinc-700 text-zinc-300' : 'bg-blue-50 text-blue-700'} rounded-full text-sm`}>
                            {keywords.length} entries
                        </span>
                    </div>


                    {/* Subheader with Add Button */}
                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
                            Add, edit or remove dictionary entries
                        </p>
                        <button
                            className={`flex items-center gap-1 mt-3 sm:mt-0 px-4 py-2 ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg text-sm transition-colors shadow-sm`}
                            onClick={() => setisadding(true)}
                        >
                            <IoMdAdd size={20} />
                            Add New Word
                        </button>
                    </div>


                    <TranslationTable isadding={isadding} setisadding={setisadding} />
                </div>
            </div>
        </Continer>
    );
};

export default ManagmentDashboard;
