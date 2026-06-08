import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.get("/manus-storage/*", async (req, res) => {
    const key = req.path.replace(/^\//, "");
    const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
    const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!key) {
      res.status(400).type("text/plain").send("Missing storage key");
      return;
    }

    if (!forgeBaseUrl || !forgeKey) {
      res.status(500).type("text/plain").send("Storage proxy not configured");
      return;
    }

    try {
      const forgeUrl = new URL("v1/storage/presign/get", `${forgeBaseUrl}/`);
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${forgeKey}` },
      });

      if (!forgeResp.ok) {
        res.status(502).type("text/plain").send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url?: string };
      if (!url) {
        res.status(502).type("text/plain").send("Empty signed URL");
        return;
      }

      res.redirect(307, url);
    } catch {
      res.status(502).type("text/plain").send("Storage proxy error");
    }
  });

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
