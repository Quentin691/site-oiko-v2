"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider ({ children }: { children: ReactNode }){
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        //Vérifier localstorage
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme){
            setTheme(savedTheme);
        }else {
            //Vérifier la presence du systeme
            const preferDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
            setTheme(preferDark ? "dark" : "light");
        }
    }, []);
    useEffect(() => {
        if (mounted){
            //Appliquer la classe au document
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(theme);
            //Sauvegarder dans localstorage
            localStorage.setItem("theme", theme);
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined){
        throw new Error("useTheme must be used within a ThemeProvider");
    } 
    return context
}