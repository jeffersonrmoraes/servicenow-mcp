// ─────────────────────────────────────────────
//  Structured Logger — sem dependências externas
//  Saída: JSON por linha no stderr (compatível com MCP stdio)
//
//  Configuração via env:
//    SN_LOG_LEVEL=debug|info|warn|error  (default: info)
// ─────────────────────────────────────────────

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

const configuredLevel = (process.env.SN_LOG_LEVEL || "info").toLowerCase() as LogLevel;
const activeLevel: number = LEVELS[configuredLevel] ?? LEVELS.info;

function emit(level: LogLevel, msg: string, meta?: Record<string, any>): void {
  if (LEVELS[level] < activeLevel) return;
  const entry: Record<string, any> = {
    ts:  new Date().toISOString(),
    lvl: level,
    msg,
    ...meta,
  };
  process.stderr.write(JSON.stringify(entry) + "\n");
}

export const logger = {
  debug: (msg: string, meta?: Record<string, any>) => emit("debug", msg, meta),
  info:  (msg: string, meta?: Record<string, any>) => emit("info",  msg, meta),
  warn:  (msg: string, meta?: Record<string, any>) => emit("warn",  msg, meta),
  error: (msg: string, meta?: Record<string, any>) => emit("error", msg, meta),
};
