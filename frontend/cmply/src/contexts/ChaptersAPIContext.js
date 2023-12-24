import { createContext, useState } from "react";

export const useChaptersAPIContext = () => {
    const [chapters, setChapters] = useState([]);

    return {
        chapters,
        setChapters
    }

}
const ChaptersAPIContext = createContext({
    chapters: null,
    setChapters: () => {},
})
export default ChaptersAPIContext;