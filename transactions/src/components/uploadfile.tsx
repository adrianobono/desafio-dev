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

const STACK = styled.div`
  display: flex !important;
  flex-direction: column;
`;

const ITEMLIST = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  background: #eee;
  margin-top: 15px;
  border: none;
  border-radius: 3px;
  width: 80vw;
  text-align: left;
`;

const ITEMLISTB = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  background: #eee;
  margin-top: 15px;
  border: none;
  border-radius: 3px;
  text-align: left;
  width: 80vw;
`;

const ITEMLISTC = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  background: #e2f3da;
  margin-top: 15px;
  border: none;
  border-radius: 3px;
  text-align: left;
  width: 80vw;
`;

const NEGATIVE = styled.div`
  padding: 0.5em;
  margin: 0.5em;
  background: #feb4ba;
  margin-top: 15px;
  border: none;
  border-radius: 3px;
  text-align: left;
  width: 80vw;
`;

export default function Uploadfile() {
  const [dados, setDados] = useState([]);
  let loja: string = "";
  let total = 0;
  const actions = [
    "Débito",
    "Boleto",
    "Financiamento",
    "Crédito",
    "Recebimento Empréstimo",
    "Vendas",
    " Recebimento TED	",
    "Recebimento DOC	",
    "Aluguel	Saída",
  ];

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
          let tempLen: any;
          total = 0;
          if (loja !== items.loja) {
            loja = items.loja;
            tempLen = dados.filter((item: any) => item.loja === loja);
            temp = dados
              .filter((item: any) => item.loja === loja)
              .map((filterData: any, indice: number) => {
                filterData.tipo !== 2 &&
                filterData.tipo !== 3 &&
                filterData.tipo !== 9
                  ? (total += filterData.valor)
                  : (total -= filterData.valor);

                if (indice === tempLen.length - 1)
                  return (
                    <STACK>
                      <ITEMLISTB>
                        {filterData.loja} - Operação:{" "}
                        {actions[filterData.tipo - 1]} - Valor:{" "}
                        {filterData.valor}
                      </ITEMLISTB>
                      {total > 0 ?
                      (<ITEMLISTC>
                        {filterData.loja} - Saldo: R$ {total.toFixed(2)}
                      </ITEMLISTC>) :
                       (<NEGATIVE>
                        {filterData.loja} - Saldo: R$ {total.toFixed(2)}
                      </NEGATIVE>)
                      }
                    </STACK>
                  );
                else
                  return (
                    <ITEMLIST>
                      {filterData.loja} - Operação:{" "}
                      {actions[filterData.tipo - 1]} - Valor: {filterData.valor}
                    </ITEMLIST>
                  );
              });
          }
          return <div>{temp}</div>;
        })}
    </div>
  );
}
