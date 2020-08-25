import { SQL } from "./repository/mssql";
import { ExcelUtil } from "./util/excelUtil";
import * as xlsx from 'xlsx';

class Program {
    public static async Run() {
        await SQL.Init();
        const workBookData = xlsx.readFile("C:/node.js/testProject/testData/test.xlsx");
        
        const jsonFromExcel = await ExcelUtil.getJSON(workBookData);
        console.log(jsonFromExcel);

        for(let i = 0; i < jsonFromExcel.length; i++) {
            SQL.insert(jsonFromExcel[i]);
            console.log("trying to add: " + i);
        }

        const jsonToExcel = await ExcelUtil.jsonToWorkBooky(jsonFromExcel);



        await xlsx.writeFile(jsonToExcel, "new_file.xlsx");    
    }
}

Program.Run();
