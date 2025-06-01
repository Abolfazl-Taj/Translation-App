import { useState } from "react";
import useTranslation from '../../Hooks/useTranslation';
import { MdDelete } from "react-icons/md";
import { FaPenRuler, FaCircleXmark, FaCheck } from "react-icons/fa6";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useTheme from "../../Hooks/useTheme"; // Assuming you have this hook

const TranslationTable = ({ isadding, setisadding }) => {
    const { theme } = useTheme(); // Get the current theme (light or dark)
    const { keywords, updateKeywords } = useTranslation();
    const [newWord, setNewWord] = useState({
        label: "",
        translations: { fa: "", ru: "", fr: "" }
    });
    const [editingId, setEditingId] = useState(null);
    const [editedWord, setEditedWord] = useState({
        label: "",
        translations: { fa: "", ru: "", fr: "", en: "" }
    });

    const handleAdd = () => {
        if (!newWord.label.trim()) return;
        const newKeyword = {
            id: newWord.label,
            order: keywords.length,
            label: newWord.label,
            translations: {
                fa: newWord.translations.fa,
                en: newWord.label,
                ru: newWord.translations.ru,
                fr: newWord.translations.fr,
            },
        };
        updateKeywords([...keywords, newKeyword]);
        setNewWord({ label: "", translations: { fa: "", ru: "", fr: "", en: "" } });
    };

    const handleRemove = (id) => {
        const updated = keywords
            .filter((item) => item.id !== id)
            .map((item, index) => ({ ...item, order: index }));
        updateKeywords(updated);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(keywords);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
        const reorderedWithIndex = reordered.map((item, index) => ({ ...item, order: index }));
        updateKeywords(reorderedWithIndex);
    };

    const edithandler = (id) => {
        const wordToEdit = keywords.find((kw) => kw.id === id);
        if (wordToEdit) {
            setEditingId(id);
            setEditedWord({ ...wordToEdit });
        }
    };

    const saveEdit = () => {
        const updatedKeywords = keywords.map((kw) =>
            kw.id === editingId ? { ...editedWord } : kw
        );
        updateKeywords(updatedKeywords);
        setEditingId(null);  // Reset editing state
    };

    const cancelEdit = () => {
        setEditingId(null);  // Reset editing state
    };

    return (
        <div className={`w-full space-y-6 my-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {isadding && (
                <div className={`bg-white p-4 rounded-lg shadow border ${theme === 'dark' ? 'border-zinc-600 bg-zinc-800' : 'border-blue-200 bg-white'} space-y-4`}>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}`}>Add New Word</h3>
                    <div className="grid grid-cols-4 gap-4">
                        <input
                            placeholder="English"
                            value={newWord.label}
                            onChange={(e) => setNewWord({ ...newWord, label: e.target.value })}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            placeholder="Persian"
                            value={newWord.translations.fa}
                            onChange={(e) => setNewWord({ ...newWord, translations: { ...newWord.translations, fa: e.target.value } })}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            placeholder="Russian"
                            value={newWord.translations.ru}
                            onChange={(e) => setNewWord({ ...newWord, translations: { ...newWord.translations, ru: e.target.value } })}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            placeholder="French"
                            value={newWord.translations.fr}
                            onChange={(e) => setNewWord({ ...newWord, translations: { ...newWord.translations, fr: e.target.value } })}
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Word
                    </button>
                    <button onClick={() => setisadding(false)} className="bg-red-500 px-4 py-2 text-white hover:bg-red-600 mx-2 rounded">Cancel</button>
                </div>
            )}

            <div className={`overflow-x-auto rounded-xl shadow-md border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-600' : 'bg-white border-blue-200'}`}>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="keywords">
                        {(provided) => (
                            <table {...provided.droppableProps} ref={provided.innerRef} className="min-w-full text-sm text-left">
                                <thead className={`uppercase text-xs ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-blue-100 text-blue-600'}`}>
                                    <tr>
                                        <th className="px-6 py-3">#</th>
                                        <th className="px-6 py-3">English</th>
                                        <th className="px-6 py-3">Persian</th>
                                        <th className="px-6 py-3">Russian</th>
                                        <th className="px-6 py-3">French</th>
                                        <th className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${theme === 'dark' ? 'divide-zinc-700' : 'divide-blue-100'}`}>
                                    {keywords.map((keyword, idx) => (
                                        <Draggable key={keyword.id} draggableId={keyword.id} index={idx}>
                                            {(provided) => (
                                                <tr
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`hover:bg-blue-50 transition-all ${theme === 'dark' ? 'hover:bg-zinc-700' : ''}`}
                                                >
                                                    <td className={`px-6 py-4 font-semibold ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'}`}>{idx + 1}</td>
                                                    {editingId === keyword.id ? (
                                                        <>
                                                            <td className="px-6 py-4">
                                                                <input
                                                                    value={editedWord.label}
                                                                    onChange={(e) => setEditedWord({ ...editedWord, label: e.target.value })}
                                                                    className="p-1 border rounded"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input
                                                                    value={editedWord.translations.fa}
                                                                    onChange={(e) =>
                                                                        setEditedWord({
                                                                            ...editedWord,
                                                                            translations: { ...editedWord.translations, fa: e.target.value },
                                                                        })
                                                                    }
                                                                    className="p-1 border rounded"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input
                                                                    value={editedWord.translations.ru}
                                                                    onChange={(e) =>
                                                                        setEditedWord({
                                                                            ...editedWord,
                                                                            translations: { ...editedWord.translations, ru: e.target.value },
                                                                        })
                                                                    }
                                                                    className="p-1 border rounded"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input
                                                                    value={editedWord.translations.fr}
                                                                    onChange={(e) =>
                                                                        setEditedWord({
                                                                            ...editedWord,
                                                                            translations: { ...editedWord.translations, fr: e.target.value },
                                                                        })
                                                                    }
                                                                    className="p-1 border rounded"
                                                                />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button onClick={saveEdit} className="text-green-600 text-2xl mx-1"><FaCheck /></button>
                                                                <button onClick={cancelEdit} className="text-red-600 text-xl mx-1"><FaCircleXmark /></button>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="px-6 py-4">{keyword.label}</td>
                                                            <td className="px-6 py-4">{keyword.translations.fa}</td>
                                                            <td className="px-6 py-4">{keyword.translations.ru}</td>
                                                            <td className="px-6 py-4">{keyword.translations.fr}</td>
                                                            <td className="px-6 py-4 gap-x-2">
                                                                <button
                                                                    onClick={() => handleRemove(keyword.id)}
                                                                    className="text-red-500 hover:underline text-2xl"
                                                                >
                                                                    <MdDelete />
                                                                </button>
                                                                <button
                                                                    onClick={() => edithandler(keyword.id)}
                                                                    className="text-blue-500 hover:underline text-xl"
                                                                >
                                                                    <FaPenRuler />
                                                                </button>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            </table>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default TranslationTable;
