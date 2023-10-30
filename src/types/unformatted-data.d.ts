export interface UnformattedData {
  'main.uploaded_variation': string;
  'main.existing_variation': string;
  'main.symbol': string;
  'main.af_vcf': number;
  'main.dp': number;
  'details2.dann_score': number | null | undefined;
  'links.mondo': string;
  'links.pheno pubmed': string;
  'details2.provean': string;
}

export type UnformattedDataType =
  | 'main.uploaded_variation'
  | 'main.existing_variation'
  | 'main.symbol'
  | 'main.af_vcf'
  | 'main.dp'
  | 'details2.dann_score'
  | 'links.pheno pubmed'
  | 'links.mondo'
  | 'details2.provean';
