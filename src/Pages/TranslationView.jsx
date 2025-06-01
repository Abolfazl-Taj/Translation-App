import { useState, useCallback, useMemo } from "react";
import Languages_Data from "../Assets/Data/Languages_Data";
import Continer from "../components/Custom/Continer";
import useTranslation from "../Hooks/useTranslation";
import useTheme from "../Hooks/useTheme";

const TranslationView = () => {
  const { keywords } = useTranslation()
  const { theme } = useTheme()
  // State management
  const [fromLang, setFromLang] = useState("fa");
  const [toLang, setToLang] = useState("en");
  const [inputText, setInputText] = useState("");
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  // Memoized language data for performance
  const availableLanguages = useMemo(() => Languages_Data, []);

  // Enhanced translation handler with debouncing
  const translateHandler = useCallback((e) => {
    const text = e.target.value.trim();
    setInputText(text);

    if (!text) {
      setTranslation("");
      return;
    }

    setIsTranslating(true);

    // Simulate slight delay for better UX (like real API call)
    const timer = setTimeout(() => {
      try {
        const matchedKeyword = keywords.find(
          keyword => keyword.translations[fromLang]?.toLowerCase() === text.toLowerCase()
        );

        if (matchedKeyword) {
          const translatedText = matchedKeyword.translations[toLang] || "Translation not available";
          setTranslation(translatedText);
        } else {
          setTranslation("Word not found in dictionary");
        }
      } catch (error) {
        console.error("Translation error:", error);
        setTranslation("Translation error occurred");
      } finally {
        setIsTranslating(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [fromLang, toLang, keywords]);

  // Language switch handler with validation
  const handleLanguageChange = (type, langCode) => {
    if (type === 'from' && langCode !== toLang) {
      setFromLang(langCode);
      setInputText("");
      setTranslation("");
    } else if (type === 'to' && langCode !== fromLang) {
      setToLang(langCode);
      setInputText("");
      setTranslation("");
    }
  };

  // Swap languages functionality
  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText("");
    setTranslation("");
  };

  return (
    <Continer>
      <div className={`w-full px-4 py-8 rounded-xl shadow-xl  border  flex flex-col gap-6 ${theme === "dark" ? "bg-zinc-900 border-zinc-950" : "border-blue-200 bg-white shadow-blue-100"}`}>
        <div className="mb-8">
          {/* Main Header */}
          <div className={`flex flex-col sm:flex-row items-end justify-between pb-3 border-b ${theme === "dark" ? "border-blue-500/80" : "border-gray-200"}`}>
            {/* Logo + Title */}
            <div className={`flex items-center gap-3 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-blue-600">Hermes</span>
                <span className="font-medium text-gray-600">Translate</span>
              </h1>
            </div>

            {/* Language Indicator */}
            <span className={`hidden sm:inline-block mb-1 text-sm ${theme === "dark" ? "text-blue-500/80" : "text-gray-500"}`}>
              Multilingual Dictionary
            </span>
          </div>

          {/* Status Bar - Simplified */}
          <div className="mt-2 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <span>Offline dictionary</span>
              <span>•</span>
              <span>4 languages available</span>
            </div>
          </div>
        </div>


        {/* Language Tabs + Textareas */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* From Language */}
          <div className="w-full md:w-1/2">
            <div className="flex gap-2 border-b mb-2 overflow-x-auto pb-1">
              {availableLanguages.map((lang) => (
                <button
                  onClick={() => handleLanguageChange('from', lang.value)}
                  key={`from-${lang.id}`}
                  className={`flex items-center px-4 py-2 gap-2 rounded-t-lg font-medium transition-all duration-300 min-w-fit ${fromLang === lang.value
                    ? theme === "dark" ? "bg-zinc-600/40 border-b-2 border-blue-500" : 'bg-blue-100 text-blue-600 border-b-2 border-blue-500'
                    : theme === "dark" ? "" : 'bg-white text-gray-500 border-b-2 border-transparent hover:bg-blue-50 hover:text-blue-500'
                    }`}
                >
                  <img src={lang.flag} alt={lang.text} className="w-5 h-5 rounded-sm" />
                  {lang.text}
                </button>
              ))}
            </div>

            <label className="text-blue-500 font-semibold block mb-1">Enter text</label>
            <textarea
              onChange={translateHandler}
              value={inputText}
              className={`w-full h-40 p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700 ${theme === "dark" ? "text-white" : "text-black"}`}
              placeholder="Type something..."
            />
          </div>

          {/* Swap Languages Button */}
          <div className="flex items-center justify-center md:justify-start md:items-start md:pt-10">
            <button
              onClick={swapLanguages}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              aria-label="Swap languages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          {/* To Language */}
          <div className="w-full md:w-1/2">
            <div className="flex gap-2 border-b mb-2 overflow-x-auto pb-1">
              {availableLanguages.map((lang) => (
                <button
                  onClick={() => handleLanguageChange('to', lang.value)}
                  key={`from-${lang.id}`}
                  className={`flex items-center px-4 py-2 gap-2 rounded-t-lg font-medium transition-all duration-300 min-w-fit ${toLang === lang.value
                    ? theme === "dark" ? "bg-zinc-600/40 border-b-2 border-blue-500" : 'bg-blue-100 text-blue-600 border-b-2 border-blue-500'
                    : theme === "dark" ? "" : 'bg-white text-gray-500 border-b-2 border-transparent hover:bg-blue-50 hover:text-blue-500'
                    }`}
                >
                  <img src={lang.flag} alt={lang.text} className="w-5 h-5 rounded-sm" />
                  {lang.text}
                </button>
              ))}
            </div>

            <label className="text-blue-500 font-semibold block mb-1">Translation</label>
            <div className="relative">
              <textarea
                readOnly
                className={`w-full h-40 p-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-700 opacity-50 ${theme === "dark" ? "text-white" : "text-black"}`}
                placeholder={isTranslating ? "Translating..." : "Translation appears here..."}
                value={translation}
              />
              {isTranslating && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </Continer>
  );
};

export default TranslationView;