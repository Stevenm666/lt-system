import { useState, useEffect } from "react";

export const useDebounceHook = (filter) => {
    const [useDebounce, setUserDebounce] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setUserDebounce(filter);
        }, 500)
        return () => clearTimeout(timeout);
    }, [filter]);
    
    return useDebounce;
};