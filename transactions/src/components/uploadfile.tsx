import React from "react";

export default function uploadfile() {
  const ruleparser = [1, 10, 21, 33, 46, 53, 68, 89];

  return (
    <div>
      <input
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          e.preventDefault();
          if (e.target.files?.length) {
            const reader = new FileReader();
            reader.onload = async (e: any) => {
              const text = e.target.result;
              let rawData: any = JSON.stringify(text.toString().split("\n"));
              let parseData: any = [];

              rawData = JSON.parse(rawData);
              rawData.pop();

            rawData.length > 0 &&
                rawData.forEach((item: string) => {
                  ruleparser.forEach((indice: number) => {
                    item = [
                      item.slice(0, indice).trim(),
                      item.slice(indice).trim(),
                    ].join(indice < 80 ? ";" : "");
                  });
                  let tempItem: Array<any>
                  tempItem = item.split(";");
                  tempItem[2] = Number(tempItem[2]) / 100;
                  tempItem[1] = new Date(
                    parseInt(tempItem[1].substr(0, 4)),
                    parseInt(tempItem[1].substr(4, 2)) - 1,
                    parseInt(tempItem[1].substr(6, 2)),
                    parseInt(tempItem[5].substr(0, 2)),
                    parseInt(tempItem[5].substr(2, 4)),
                    parseInt(tempItem[5].substr(4, 6))
                  ).toISOString();
                  parseData.push(item);
                });           
            };
            reader.readAsText(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
