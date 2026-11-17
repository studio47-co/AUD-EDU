import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" + roteamento por hash: o build estático abre em qualquer hospedagem (inclusive pasta local).
export default defineConfig({ base: "./", plugins: [react()], build: { target: "es2020" } });
