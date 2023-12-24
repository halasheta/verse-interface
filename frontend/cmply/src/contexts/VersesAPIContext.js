import { createContext, useState } from "react";

export const useVersesAPIContext = () => {
    const [verses, setVerses] = useState([]);
    const [transVerses, setTransVerses] = useState([]);
    const [chapter, setChapter] = useState("");

    return {
        verses,
        setVerses,
        chapter,
        setChapter
    }

}
const VersesAPIContext = createContext({
    verses: null,
    setVerses: () => {},
    chapter: "",
    setChapter: () => {}
})
export default VersesAPIContext;