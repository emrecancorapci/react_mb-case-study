import { MBData } from '@/types/mb-data';
import { OrganizedMBData } from '@/types/organized-mb-data';

export type FormattedData =
  | 'uploaded_variation'
  | 'existing_variation'
  | 'symbol'
  | 'af_vcf'
  | 'depth'
  | 'dann_score'
  | 'pheno_pubmed'
  | 'mondo'
  | 'provean';

export type UnFormattedData =
  | 'main.uploaded_variation'
  | 'main.existing_variation'
  | 'main.symbol'
  | 'main.af_vcf'
  | 'main.dp'
  | 'details2.dann_score'
  | 'links.pheno pubmed'
  | 'links.mondo'
  | 'details2.provean';

export const dataFormatter: (data: MBData[]) => OrganizedMBData[] = (data: MBData[]) => {
  return data.map((item: MBData) => {
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

export const dataFormatterReverse: (data: OrganizedMBData[]) => MBData[] = (data: OrganizedMBData[]) => {
  return data.map((item: OrganizedMBData) => {
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

export const dataMapper: (data: string) => FormattedData | 'ERROR' = (data: string) => {
  const dataMap = new Map([
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

  return (dataMap.get(data) as FormattedData) ?? 'ERROR';
};

export const dataMapperReverse: (data: FormattedData) => string = (data: FormattedData) => {
  const dataMap = new Map<FormattedData, UnFormattedData>([
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

export const getDataType = (data: FormattedData) => {
  const dataTypeMap = new Map([
    ['uploaded_variation', 'enum'],
    ['existing_variation', 'enum'],
    ['symbol', 'enum'],
    ['af_vcf', 'numeric'],
    ['depth', 'numeric'],
    ['dann_score', 'numeric'],
    ['pheno_pubmed', 'free_form'],
    ['mondo', 'free_form'],
    ['provean', 'free_form'],
  ]);

  return dataTypeMap.get(data) ?? 'ERROR';
};
