import React, { useContext, useState } from "react";
import themes from "../styles/themes";

const ThemeContext = React.createContext()

export const ThemeProvider = ({children}) =>{

    const [theme, setTheme] = useState(0)
    const currentTheme = themes[theme]

    return (
        <ThemeContext.Provider value={currentTheme}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () =>{
    return useContext(ThemeContext)
}
