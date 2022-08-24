/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                md: "0 0 15px 0 rgba(0, 0, 0, 1)",
            },
            animation: {
                pulse: "pulse 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                appear: "show 0.4s ease forwards",
            },
            keyframes: {
                pulse: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: ".6" },
                },
                show: {
                    "0%": { opacity: "0" },
                    "100%": { opcaity: "1" },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
