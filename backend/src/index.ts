import "dotenv/config";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { globalRateLimiter } from "./rateLimit.js";
import { translateRouter } from "./routes/translate.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Defense in depth: hide stack fingerprint (Helmet also strips this on responses)
app.disable("x-powered-by");

app.use(helmet());

app.use(compression());

app.use((_req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
      .map((o) => o.trim())
      .filter(Boolean)
  : ["http://localhost:3000", "http://127.0.0.1:3000", "http://frontend:3000"];

app.use(
  cors({
    origin: corsOrigins,
    methods: ["GET", "POST"],
    credentials: false,
  })
);
app.use(express.json({ limit: "1kb" }));

// Global rate limit — runs before all routes so 404/unknown paths are counted too.
app.use(globalRateLimiter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", translateRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    const status =
      err && typeof err === "object" && "status" in err && typeof (err as { status: unknown }).status === "number"
        ? (err as { status: number }).status
        : undefined;
    if (status === 413) {
      res.status(413).json({ error: "Request body too large." });
      return;
    }
    const message =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err instanceof Error
          ? err.message
          : "Internal Server Error";
    res.status(500).json({ error: message });
  }
);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
