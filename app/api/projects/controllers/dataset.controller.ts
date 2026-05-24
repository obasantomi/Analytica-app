import axios from "axios";
import { buildWorldBankUrl } from "../services/buildWorldBankUrl";
import { datasetService } from "../services/datasetService";

interface DatasetParams {
  title: string;
  category: string;
  country: string;
  datasetConfig: {};
  summary: string;
}

export const getDatasetParams = async (): Promise<DatasetParams | null> => {
  const urlParams = buildWorldBankUrl();
  console.log(urlParams);
  const response = await axios.get(urlParams.url);

  const data = await response.data?.[1]; // World Bank API returns metadata in the first element

  if (!data || !data.length) {
    return null; // No data available for this dataset
  }

  const normalizedData = datasetService.normalizeData(data);
  const summary = datasetService.createSummary(normalizedData);

  return {
    title: urlParams.title!,
    category: urlParams.category!,
    country: urlParams.country,
    datasetConfig: urlParams.datasetConfig,
    summary,
  };
};
