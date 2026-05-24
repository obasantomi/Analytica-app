export const datasetService = {
  createSummary(rows: any[]) {
    const values = rows.map((r) => r.value);

    const latest = rows[0];
    const oldest = rows[rows.length - 1];

    const min = Math.min(...values);
    const max = Math.max(...values);

    return `
Dataset Summary:

Country: ${latest.country}

Time Range: ${oldest.year} - ${latest.year}

Latest Value (${latest.year}): ${latest.value}
Oldest Value (${oldest.year}): ${oldest.value}

Min Value: ${min}
Max Value: ${max}

Trend: ${latest.value > oldest.value ? "Increasing" : "Decreasing"}
`;
  },

  normalizeData(raw: any[]) {
    return raw
      .filter((item) => item.value !== null)
      .map((item) => ({
        country: item.country.value,
        countryCode: item.countryiso3code,
        year: item.date,
        value: item.value,
      }));
  },
};
