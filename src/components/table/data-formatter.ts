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
