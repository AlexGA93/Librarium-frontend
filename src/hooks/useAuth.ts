import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context || context === undefined) {
        throw new Error("useAuth debe utilizarse dentro del provider");
    }

    return context;
};