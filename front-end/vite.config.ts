import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["/.test/setup.js"],
		exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
	},
});
