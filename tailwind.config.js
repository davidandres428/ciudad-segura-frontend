/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0F2A43",     // azul noche institucional (marca, navbar, footer)
        harbor: "#1B6E76",    // teal ancla, acciones secundarias
        signal: "#E8A33D",    // ámbar de alerta, acciones primarias
        alarm: "#C0392B",     // rojo, estados críticos / pendientes
        mist: "#F5F8FA",      // fondo general
        ink: "#16222E",       // texto principal
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

