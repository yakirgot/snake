import { spawn } from "node:child_process";
import os from "node:os";

const cmd = os.platform() === "win32" ? "npx.cmd" : "npx";
const args = ["-y", "@playwright/mcp@latest", ...process.argv.slice(2)];

console.error(`Starting Playwright MCP with: ${cmd} ${args.join(" ")}`);

const child = spawn(cmd, args, { stdio: "inherit", shell: true });

child.on("error", (err) => {
	console.error("Failed to start Playwright MCP:", err);
	process.exit(1);
});

child.on("exit", (code) => {
	process.exit(code ?? 0);
});
