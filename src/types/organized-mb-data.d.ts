export interface OrganizedMBData {
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
