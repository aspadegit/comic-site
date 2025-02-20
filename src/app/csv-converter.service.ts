import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { ComicServiceService } from './comic-service.service';

@Injectable({
  providedIn: 'root'
})
export class CsvConverterService {

  constructor(private comicService : ComicServiceService) { }

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, CsvConverterService.toExportFileName(excelFileName));
  }

  public async importFileAsJson(file : any, lambda : any)
  {
    
    var reader = new FileReader();
    reader.onload = (e) => {this.fileReaderLoad(e, lambda);}
    reader.readAsArrayBuffer(file);

  }

  fileReaderLoad(e : any, lambda : any)
  {
    var data = e.target?.result;

        var workbook = XLSX.read(data, {type: 'binary'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        var json = XLSX.utils.sheet_to_json(sheet);
        console.log(json);
        lambda(json, this.comicService);
  }

  public importExcelAsJson(data : any)
  {

    console.log(XLSX.read(data))
    //var jsa = XLSX.utils.sheet_to_json(worksheet, opts);

  }
}
