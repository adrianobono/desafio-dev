import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: #ddd;
  border: none;
  border-radius: 3px;
  color: green;
`;

const TITLE = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  background: #eee;
  margin-top: -5px;
  border: none;
  border-radius: 3px;
  border-bottom: 1px solid green;
  border-left: 1px solid green;
  border-right: 1px solid green;
`;

export default function Uploadfile() {
  const [dados, setDados] = useState([]);
  let loja: string = "";
  let total = 0;

  return (
    <div className="flex">
      <TITLE>DESAFIO PARSE ARQUIVO TXT</TITLE>
      <form>
        <label>Upload de arquivo: </label>
        <Input
          type="file"
          onChange={(e: any): void => {
            e.preventDefault();

            if (e.target.files?.length) {
              const reader = new FileReader();
              reader.onload = async (e: any) => {
                const text = e.target.result;
                let rawData: any = JSON.stringify(text.toString().split("\n"));
                rawData = JSON.parse(rawData);
                rawData.pop();
                await fetch("http://localhost:4000/postdata", {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(rawData),
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    if (data.message === "ok") {
                      fetch("http://localhost:4000/getdata", {
                        headers: {
                          "Content-Type": "application/json",
                        },
                        method: "GET",
                      })
                        .then((response) => {
                          return response.json();
                        })
                        .then((dadosb: any) => {
                          console.log(dadosb);
                          setDados(dadosb);
                        });
                    }
                  });
              };
              reader.readAsText(e.target.files[0]);
            }
          }}
        />
      </form>

      {dados &&
        dados.length > 0 &&
        dados.map((items: any) => {
          let temp: any;
          
          total = 0;
          if (loja !== items.loja) {
            loja = items.loja;
            temp =  dados
            .filter((item: any ) => item.loja === loja)
           dados
              .filter((item: any ) => item.loja === loja)
              .map((filterData: any, indice:number) => {
               
                filterData.tipo !== 2 && 
                filterData.tipo !== 3 &&
                filterData.tipo !== 9 
                ?
                 total += filterData.valor :  total -= filterData.valor ;
                console.log(indice,'....',temp);
                return <div className="flex justify-content">{filterData.loja} - Saldo: {total.toFixed(2)}</div>;
              });
          }
          return <div>{temp}</div>;
        })}
    </div>
  );
}
