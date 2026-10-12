/**
 * Similarity Matcher — Scam DNA engine
 * Deterministic weighted indicator overlap. No LLM required.
 */

// Weights for each indicator type
const WEIGHTS = {
  DOMAIN:         0.40,
  PHONE:          0.35,
  EMAIL:          0.30,
  TACTIC:         0.20,
  BRAND:          0.18,
  PHRASE:         0.15,
  SOCIAL_HANDLE:  0.25,
  URL:            0.35,
};

/**
 * Compute Scam DNA between two indicator lists.
 * Returns { similarityScore, matchedClues, differences }
 */
export const computeScamDNA = (indicatorsA, indicatorsB) => {
  const mapA = buildMap(indicatorsA);
  const mapB = buildMap(indicatorsB);

  const matchedClues = [];
  const allKeys = new Set([...mapA.keys(), ...mapB.keys()]);
  let totalScore = 0;

  for (const key of allKeys) {
    if (mapA.has(key) && mapB.has(key)) {
      const [type, value] = key.split("::");
      const weight = WEIGHTS[type] ?? 0.10;
      totalScore += weight;
      matchedClues.push({
        field: type.toLowerCase(),
        value,
        weight,
        explanation: buildExplanation(type, value),
      });
    }
  }

  // Cap at 1.0
  const similarityScore = Math.min(Math.round(totalScore * 100) / 100, 1.0);

  // Differences: in A but not B
  const differences = [];
  for (const [key, val] of mapA) {
    if (!mapB.has(key)) {
      const [type, value] = key.split("::");
      differences.push({ field: type.toLowerCase(), valueA: value, valueB: null, note: `Only in report A` });
    }
  }
  for (const [key, val] of mapB) {
    if (!mapA.has(key)) {
      const [type, value] = key.split("::");
      differences.push({ field: type.toLowerCase(), valueA: null, valueB: value, note: `Only in report B` });
    }
  }

  return { similarityScore, matchedClues, differences };
};

const buildMap = (indicators) => {
  const m = new Map();
  for (const ind of indicators) {
    m.set(`${ind.type}::${ind.value}`, true);
  }
  return m;
};

const buildExplanation = (type, value) => {
  switch (type) {
    case "DOMAIN":  return `Both reports reference the same domain: ${value}`;
    case "PHONE":   return `Same phone number ${value} appears in both reports — strong campaign link`;
    case "TACTIC":  return `Both reports use the same scam tactic: ${value.replace(/_/g, " ")}`;
    case "PHRASE":  return `Identical suspicious phrase found in both: "${value}"`;
    case "BRAND":   return `Both impersonate the same brand: ${value}`;
    case "EMAIL":   return `Same email address used in both reports`;
    default:        return `Shared ${type.toLowerCase()}: ${value}`;
  }
};

/**
 * Find the top N similar reports to a given indicator set using DB
 * Called during live check to show "related reports"
 */
export const findSimilarReports = async (prisma, indicators, excludeId, limit = 5) => {
  if (!indicators?.length) return [];

  const allValues = indicators.map(i => i.value);
  if (!allValues.length) return [];

  const placeholders = allValues.map((_, i) => `$${i + 2}`).join(",");
  const rows = await prisma.$queryRawUnsafe(
    `SELECT r.id, r."contentType", r."publicSummary", r."riskLevel", r.platform, r."createdAt",
            COUNT(DISTINCT i.value) as "matchCount"
     FROM "Report" r
     JOIN "ReportIndicator" ri ON ri."reportId"=r.id
     JOIN "Indicator" i ON i.id=ri."indicatorId"
     WHERE r.id!=$1 AND i.value IN (${placeholders})
       AND r.status IN ('PUBLISHED','CORROBORATED')
     GROUP BY r.id, r."contentType", r."publicSummary", r."riskLevel", r.platform, r."createdAt"
     ORDER BY "matchCount" DESC
     LIMIT $${allValues.length + 2}`,
    excludeId, ...allValues, limit
  );
  // COUNT(*) returns BigInt in pg driver — convert to Number for JSON
  return rows.map(r => ({ ...r, matchCount: Number(r.matchCount) }));
};
