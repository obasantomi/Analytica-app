import type { DatasetConfigFields } from "./types";

export function readDatasetConfig(config: unknown): DatasetConfigFields {
  if (!config || typeof config !== "object") return {};
  const o = config as Record<string, unknown>;
  const startYear = typeof o.startYear === "number" ? o.startYear : undefined;
  const endYear = typeof o.endYear === "number" ? o.endYear : undefined;
  const indicator = typeof o.indicator === "string" ? o.indicator : undefined;
  const country = typeof o.country === "string" ? o.country : undefined;
  return { startYear, endYear, indicator, country };
}

export function fileTypeLabel(config: DatasetConfigFields): string {
  const years =
    config.startYear != null && config.endYear != null
      ? `${config.startYear}–${config.endYear}`
      : "multi-year";
  const region = config.country ? ` · ${config.country}` : "";
  return `.CSV (${years}${region})`;
}
