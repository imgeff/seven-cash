import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
	server: {
		port: 3000,
		open: true
	},
	base: "/login/",
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["/.test/setup.js"],
		exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
	},
});
