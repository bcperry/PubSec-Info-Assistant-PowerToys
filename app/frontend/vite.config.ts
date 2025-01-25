import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from 'postcss-nesting';
import nodePolyfills from 'rollup-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            ...nodePolyfills(),
            name: 'node-polyfills',
            resolveId(importee, importer) {
                if (!importer) return null;
                const result = nodePolyfills().resolveId(importee, importer);
                if (result && typeof result === 'object') {
                    return {
                        ...result,
                        moduleSideEffects: false
                    };
                }
                return result;
            }
        }
    ],
    build: {
        outDir: "../backend/static",
        emptyOutDir: true,
        sourcemap: true,
    },
    server: {
        proxy: {
            "/": "http://localhost:5000"
        }
    },
    css: {
        postcss: {
            plugins: [
                postcssNesting
            ],
        },
    },
    resolve: {
        alias: {
            buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
            process: 'rollup-plugin-node-polyfills/polyfills/process-es6'
        }
    }
});
