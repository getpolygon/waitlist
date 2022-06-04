import { createTheme } from "@mui/material";

export const newCustomTheme = (mode: "light" | "dark") => createTheme({
    typography: {
        fontFamily: "Syne",
        allVariants: {
            color: "whitesmoke"
        }
    },

    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    fontWeight: "500",
                    fontFamily: "Syne"
                }
            },
        },

    },

    palette: {
        mode,
        primary: {
            main: "#A379C9",
        },
    },
});