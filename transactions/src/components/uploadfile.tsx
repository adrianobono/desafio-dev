import React from "react";

export default function uploadfile() {
  const ruleparser = [1, 10, 21, 33, 46, 53, 68, 89];

  return (
    <div>
      <form>
        <label>Upload de arquivo: </label>
        <input
          type="file"
          onChange={(e: any): void => {
            e.preventDefault();

            if (e.target.files?.length) {
              const reader = new FileReader();
              let parseData: any = [];
              reader.onload = async (e: any) => {
                const text = e.target.result;
                let rawData: any = JSON.stringify(text.toString().split("\n"));
                rawData = JSON.parse(rawData);
                rawData.pop();
                await fetch("http://localhost:4000/data", {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(rawData),
                });
              };
              reader.readAsText(e.target.files[0]);
            }
          }}
        />
      </form>
    </div>
  );
}
