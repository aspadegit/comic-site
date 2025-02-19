import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CsvConverterService {

  constructor() { }

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, CsvConverterService.toExportFileName(excelFileName));
  }

  public importExcelAsJson(worksheet: any, opts: any)
  {
    var jsa = XLSX.utils.sheet_to_json(worksheet, opts);

  }
}
