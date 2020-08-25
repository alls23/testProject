import * as xlsx from 'xlsx';
import { IExcelRrepresentation } from "../interfaces/IExcelRrepresentation";

export class ExcelUtil {
    
    public static async jsDateToSqlDate(date: Date) {
        console.log(date.toISOString().slice(0, 19).replace('T', ' '));
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    public static async getJSON(wb: any) {
        let sheetsNames = wb.SheetNames;
        let excelRepArr: Array<IExcelRrepresentation> = [];
        const date: Date = new Date(); 
        for(let i = 0; i < sheetsNames.length; i++) {
            let x = xlsx.utils.sheet_to_json<string>(wb.Sheets[sheetsNames[i]]);
            let excelRep: IExcelRrepresentation = {
                sheetName : sheetsNames[i],
                sheet : x,
                date : date
            };
            excelRepArr.push(excelRep);
        }
        return excelRepArr;
    }

    public static async jsonToWorkBooky(arr: Array<IExcelRrepresentation>) {
        let newWb = xlsx.utils.book_new();
        for(let i = 0; i < arr.length; i++) {
            let tempSheet = xlsx.utils.json_to_sheet(arr[i].sheet);
            xlsx.utils.book_append_sheet(newWb, tempSheet, arr[i].sheetName); 
        }
        
        return newWb;
    }
}
