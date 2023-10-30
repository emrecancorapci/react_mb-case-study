export interface FormattedData {
  uploaded_variation: string;
  existing_variation: string;
  symbol: string;
  af_vcf: number;
  depth: number;
  dann_score: number | null | undefined;
  mondo: string;
  pheno_pubmed: string;
  provean: string;
}

export type FormattedDataType =
  | 'uploaded_variation'
  | 'existing_variation'
  | 'symbol'
  | 'af_vcf'
  | 'depth'
  | 'dann_score'
  | 'pheno_pubmed'
  | 'mondo'
  | 'provean';
