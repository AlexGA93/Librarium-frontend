import { BookContext } from "@/context/bookContext";
import { useContext } from "react";

export const useBooks = () => {
    const context = useContext(BookContext);

    if (!context || context === undefined) {
        throw new Error("useBooks debe utilizarse dentro del provider");
    }

    return context;
};