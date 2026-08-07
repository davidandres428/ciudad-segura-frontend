import axios from "axios";

/**
 * Cliente HTTP centralizado para consumir la API REST del backend
 * de Ciudad Segura (Spring Boot).
 *
 * La URL base se toma de la variable de entorno VITE_API_URL para
 * poder cambiar de entorno (local, pruebas, producción) sin tocar
 * el código. Si no existe, se usa localhost:8080 por defecto.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
