import * as sql from 'mssql';
import { IExcelRrepresentation } from "../interfaces/IExcelRrepresentation";
import { ExcelUtil } from "../util/excelUtil";



export class SQL {
    private static _conn:sql.ConnectionPool;
    private static cfg = {
        user: "sa",
        password: "Iura2323!!",
        server: "localhost",
        database: "master",
        connectionTimeout: 10000,
        options: { encrypt: false, enableArithAbort:false },
        pool: { autostart: true }
    }
    //Init method which create table if do not exist
    public static async Init():Promise<void> {
        this._conn = new sql.ConnectionPool(this.cfg);
        this._conn.on("error",(e)=>{ console.error(e);})
        this._conn = await this._conn.connect();
        let rv = await this._conn.query` SELECT * FROM [INFORMATION_SCHEMA].[TABLES] WHERE TABLE_NAME ='excelTable'`;
        console.log("db phase");

        if(rv.recordset.length === 0) {  
            await this._conn.request().query(`CREATE TABLE excelTable (
                id BIGINT PRIMARY KEY IDENTITY,
                jsonForm NVARCHAR(4000),
                dateAdded DATETIME
            )`); 
        }
    }

    public static async update():Promise<void> {
        this._conn = new sql.ConnectionPool(this.cfg);
        this._conn.on("error",(e)=>{ console.error(e);})

        try {
            this._conn = await this._conn.connect();  
        } catch (error) {
            console.error(error + " error when connected");
        }
        
        try {
            await this._conn.request().query(`CREATE TABLE heroes (
                id INTEGER PRIMARY KEY,
                name VARCHAR(64) NOT NULL
            )`); 
        } catch (error) {
            console.error(error + " update error");
        }
    }

    public static async insert(excelData: IExcelRrepresentation):Promise<void> {
        this._conn = new sql.ConnectionPool(this.cfg);
        this._conn.on("error",(e)=>{ console.error(e);})
            let sqlDate = ExcelUtil.jsDateToSqlDate(excelData.date);
            this._conn = await this._conn.connect();  
            this._conn.request()
            .input("jsonForm", sql.NVarChar, excelData.sheet) 
            .input("dateAdded", sql.DateTime, ExcelUtil.jsDateToSqlDate(excelData.date));    
            await this._conn.request().query(`INSERT INTO dbo.excelTable 
                (jsonForm, dateAdded) VALUES (@jsonForm, @dateAdded)`); 
           
    }



}