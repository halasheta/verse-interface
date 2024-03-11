import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            light: "#ff9d3f",
            main: "#ea7600",
            dark: "#bb4d00",
            contrastText: "#1b1b1b",
        },
    },
    typography: {
        fontFamily: ["'Work Sans'", "sans-serif"].join(","),
        button: {
            textTransform: "none",
        },
    },
});
