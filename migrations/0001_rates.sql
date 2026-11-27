-- Rate Check (worker/index.ts). Applied to D1 database creators-rate-check.
-- One anonymous rate per row. No names, handles, emails, IPs or exact dates.
CREATE TABLE IF NOT EXISTS rates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL,
  format TEXT NOT NULL,
  tier TEXT NOT NULL,
  followers INTEGER NOT NULL,
  rate_usd INTEGER NOT NULL,
  usage_rights INTEGER NOT NULL DEFAULT 0,
  niche TEXT,
  region TEXT,
  month TEXT NOT NULL,             -- YYYY-MM only
  source TEXT NOT NULL DEFAULT 'community', -- 'community' or 'agency' (seed data)
  status TEXT NOT NULL DEFAULT 'ok'         -- 'ok' counts; 'pending' and 'flagged' don't
);
CREATE INDEX IF NOT EXISTS rates_bucket ON rates (platform, tier, format, status);
