import { FormattedData, FormattedDataType } from '@/types/formatted-data';
import { UnformattedData, UnformattedDataType } from '@/types/unformatted-data';

export const dataFormatter: (data: UnformattedData[]) => FormattedData[] = (data: UnformattedData[]) => {
  return data.map((item: UnformattedData) => {
    return {
      uploaded_variation: item['main.uploaded_variation'],
      existing_variation: item['main.existing_variation'],
      symbol: item['main.symbol'],
      af_vcf: item['main.af_vcf'],
      depth: item['main.dp'],
      dann_score: item['details2.dann_score'],
      pheno_pubmed: item['links.pheno pubmed'],
      mondo: item['links.mondo'],
      provean: item['details2.provean'],
    };
  });
};

export const dataFormatterReverse: (data: FormattedData[]) => UnformattedData[] = (data: FormattedData[]) => {
  return data.map((item: FormattedData) => {
    return {
      'main.uploaded_variation': item.uploaded_variation,
      'main.existing_variation': item.existing_variation,
      'main.symbol': item.symbol,
      'main.af_vcf': item.af_vcf,
      'main.dp': item.depth,
      'details2.dann_score': item.dann_score,
      'links.pheno pubmed': item.pheno_pubmed,
      'links.mondo': item.mondo,
      'details2.provean': item.provean,
    };
  });
};

export const dataMapper: (data: UnformattedDataType) => FormattedDataType | 'ERROR' = (data: UnformattedDataType) => {
  const dataMap = new Map<UnformattedDataType, FormattedDataType>([
    ['main.uploaded_variation', 'uploaded_variation'],
    ['main.existing_variation', 'existing_variation'],
    ['main.symbol', 'symbol'],
    ['main.af_vcf', 'af_vcf'],
    ['main.dp', 'depth'],
    ['details2.dann_score', 'dann_score'],
    ['links.pheno pubmed', 'pheno_pubmed'],
    ['links.mondo', 'mondo'],
    ['details2.provean', 'provean'],
  ]);

  return dataMap.get(data) ?? 'ERROR';
};

export const dataMapperReverse: (data: FormattedDataType) => UnformattedDataType | 'ERROR' = (
  data: FormattedDataType,
) => {
  const dataMap = new Map<FormattedDataType, UnformattedDataType>([
    ['uploaded_variation', 'main.uploaded_variation'],
    ['existing_variation', 'main.existing_variation'],
    ['symbol', 'main.symbol'],
    ['af_vcf', 'main.af_vcf'],
    ['depth', 'main.dp'],
    ['dann_score', 'details2.dann_score'],
    ['pheno_pubmed', 'links.pheno pubmed'],
    ['mondo', 'links.mondo'],
    ['provean', 'details2.provean'],
  ]);

  return dataMap.get(data) ?? 'ERROR';
};
