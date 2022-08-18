/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                md: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
            },
            animation: {
                pulse: "pulse 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                pulse: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: ".6" },
                },
            },
        },
    },
    plugins: [],
};
