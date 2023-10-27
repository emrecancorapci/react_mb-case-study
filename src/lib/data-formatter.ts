import { MBData } from '@/types/mb-data';
import { OrganizedMBData } from '@/types/organized-mb-data';

export const dataFormatter: (data: MBData[]) => OrganizedMBData[] = (data: MBData[]) => {
  return data.map((item: MBData) => {
    return {
      uploaded_variation: item['main.uploaded_variation'],
      existing_variation: item['main.existing_variation'],
      symbol: item['main.symbol'],
      af_vcf: item['main.af_vcf'],
      dp: item['main.dp'],
      dann_score: item['details2.dann_score'],
      pheno_pubmed: item['links.pheno pubmed'],
      mondo: item['links.mondo'],
      provean: item['details2.provean'],
    };
  });
};

export const dataMapper: (data: string) => string = (data: string) => {
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

  return dataMap.get(data) ?? 'ERROR';
};

export const dataMapperReverse: (data: string) => string = (data: string) => {
  const dataMap = new Map([
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
