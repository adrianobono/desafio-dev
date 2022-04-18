
import { Request, Response } from "express";


import { client } from "../database";
const format = require('pg-format');
const { v4: uuidv4 } = require('uuid');

const parseData = (data: any) => {
  const ruleparser = [1, 10, 21, 33, 46, 53, 68, 89];

return data.map((item: any) => {
     ruleparser.forEach((indice: number) => {
       item = [
         item.slice(0, indice).trim(),
         item.slice(indice).trim(),
       ].join(indice < 80 ? ";" : "");
     });
                    item = item.split(";");
                    item[2] = (Number(item[2]) / 100).toFixed(2);
                    item[1] = new Date(
                      parseInt(item[1].substr(0, 4)),
                      parseInt(item[1].substr(4, 2)),
                      parseInt(item[1].substr(6, 2)),
                      parseInt(item[5].substr(0, 2)),
                      parseInt(item[5].substr(2, 4)),
                      parseInt(item[5].substr(4, 6))
                    );
                    item[5] = item[1].getTime()
                    item.push(uuidv4())
                  return item
 })
  
};
export const inputData = async (req: Request, res: Response) => {

  let rows = parseData(req.body) 

  if(rows){ 
      client.connect();
      client.query('TRUNCATE TABLE transactions');
     const response = await  client.query(format('INSERT INTO transactions (tipo, data, valor, cpf, cartao, hora, dono, loja, id) VALUES %L', rows),[], (err:any, result:any)=>{
         console.log(err);
         console.log(result); 
     });
}
  res.json({ message: "ok" });
};

export const getData = async (req: Request, res: Response) => {
  
        client.connect();
       const response = await  client.query('SELECT * FROM transactions ORDER BY loja ASC',[], (err:any, result:any)=>{
           console.log(err);
           console.log(result); 
           if(result){
               console.log(result)
               return res.status(200).json(result.rows);
           }
       });

    
  };
