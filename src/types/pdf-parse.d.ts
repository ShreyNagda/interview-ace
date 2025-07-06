declare module "pdf-parse" {
  import { Buffer } from "buffer";

  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: object;
    metadata: object;
    version: string;
  }

  interface PDFData {
    text: string;
    info: PDFInfo;
    metadata: unknown;
    version: string;
  }

  function pdf(buffer: Buffer): Promise<PDFData>;

  export = pdf;
}
