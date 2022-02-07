import { createTheme, colors } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: colors.blue["500"],
        },
        secondary: {
            main: colors.lightGreen["500"]
        },
        /*text: {
            primary: "#fff",
            secondary: "#dcdcdc"
        }*/
    },
    typography: {
        fontFamily: "'Montserrat'"
    },
    
})

export default theme;