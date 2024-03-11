import { createContext, useState } from "react";

export const useLoadingContext = () => {
    const [isLoading, setIsLoading] = useState(true);

    return {
        isLoading,
        setIsLoading,
    };
};
const LoadingContext = createContext({
    isLoading: true,
    setIsLoading: () => {},
});
export default LoadingContext;
