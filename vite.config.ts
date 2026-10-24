import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { execFile } from 'node:child_process';
import path from 'node:path';

// 開發時：cards/、data/、docs/ 有變動就重新編譯 index.json 並重新整理頁面（可邊用 Obsidian 編輯邊看）
function rebuildIndexOnChange(): Plugin {
  return {
    name: 'rebuild-index-on-change',
    configureServer(server) {
      const dirs = ['cards', 'data', 'docs'].map((d) => path.resolve(d));
      server.watcher.add(dirs);
      let timer: ReturnType<typeof setTimeout> | undefined;
      const onChange = (file: string) => {
        if (!dirs.some((d) => file.startsWith(d)) || !/\.(md|ya?ml|json)$/.test(file)) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          execFile(process.execPath, [path.resolve('node_modules/tsx/dist/cli.mjs'), 'scripts/build-index.ts'], (err, out, errOut) => {
            if (err) server.config.logger.error(errOut || String(err));
            else server.config.logger.info(out.trim());
            server.ws.send({ type: 'full-reload' });
          });
        }, 300);
      };
      server.watcher.on('change', onChange);
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
    },
  };
}

export default defineConfig({
  plugins: [react(), rebuildIndexOnChange()],
  server: { port: 5173, open: !process.env.NO_OPEN },
  build: { chunkSizeWarningLimit: 2500 },
});
