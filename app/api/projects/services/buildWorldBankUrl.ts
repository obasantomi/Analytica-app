import { COUNTRIES, DATASET_CATEGORIES } from "@/lib/datasets/datasetParams";

export type Categories = keyof typeof DATASET_CATEGORIES;
const categories = Object.keys(DATASET_CATEGORIES) as Categories[];

// getRandomItem: Return a random element from a readonly array
const getRandomItem = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// randomDateRange: Produce a random start and end year window for datasets
function randomDateRange() {
  const start = 1990 + Math.floor(Math.random() * 20); // 1990–2010
  const end = start + 5 + Math.floor(Math.random() * 15); // 5–20 years span

  return {
    startYear: start,
    endYear: end,
  };
}

// buildWorldBankUrl: Generate random dataset parameters and invoke URL builder
export function buildWorldBankUrl() {
  const category = getRandomItem<Categories>(categories);
  const dataset = getRandomItem(DATASET_CATEGORIES[category]).indicator;
  const title = getRandomItem(DATASET_CATEGORIES[category]).title;
  const country = getRandomItem(COUNTRIES).code;
  const { startYear, endYear } = randomDateRange();

  const urlParams = buildUrl({
    title,
    category,
    country,
    indicator: dataset,
    startYear,
    endYear,
  });
  return urlParams;
}

// buildUrlParameters: Construct a World Bank API URL and return metadata
export function buildUrl({
  title,
  category,
  country,
  indicator,
  startYear,
  endYear,
  page = 1,
  perPage = 100,
}: {
  title?: string;
  category?: string;
  country: string;
  indicator: string;
  startYear: number;
  endYear: number;
  page?: number;
  perPage?: number;
}) {
  return {
    url: `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&date=${startYear}:${endYear}&page=${page}&per_page=${perPage}`,
    category,
    country,
    title,
    datasetConfig: {
      country,
      indicator,
      startYear,
      endYear,
      page,
      perPage,
    },
  };
}
