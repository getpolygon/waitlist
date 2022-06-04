import { createTheme } from "@mui/material";

export const newCustomTheme = (mode: "light" | "dark") => createTheme({
    typography: {
        fontFamily: "syne",
        allVariants: {
            color: "whitesmoke"
        }
    },

    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    fontWeight: "bolder",
                }
            },
        },

    },

    palette: {
        mode,
        primary: {
            main: "#8CD790",
        },
    },
});