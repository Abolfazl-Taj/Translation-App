import { useContext } from "react";
import { TranslationContext } from "../context/TranslationContext";

const useTranslation = () => {
    const value = useContext(TranslationContext);
    if (!value) {
        throw new Error("No context has been found!");  
    }
    return value;
};
export default useTranslation