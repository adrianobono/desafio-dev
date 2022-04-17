import React from 'react'
import { parseISO } from 'date-fns'

export default function uploadfile() {
//const ruleparser =[1,9,19,30,42,48,62,81]
const ruleparser =[1,10,21,33,46,53,68,90]



  return (
    <div>
      <input type="file" onChange={(e:React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
       if(e.target.files?.length){
        const reader = new FileReader()
        reader.onload = async (e:any) => { 
          const text = (e.target.result);
          let parseData:any = JSON.stringify(text.toString().split("\n"));
          
          parseData = JSON.parse(parseData);
          parseData.pop();
        
          if(parseData.length > 0) {
             parseData.map((item:any) =>{
                ruleparser.map((indice:number)=>{
                
                 item = [item.slice(0, indice).trim(),   item.slice(indice).trim()].join(';');
                 
                }) 
                console.log(item)
             })
          }
        
        };
        reader.readAsText(e.target.files[0])


        // console.log(e.target.files[0]);
        console.log(JSON.stringify(e.target.files[0]))
         
       }
      }}/>
    </div>
  )
}
