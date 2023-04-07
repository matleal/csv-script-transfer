import { readFileSync, writeFileSync } from "fs";

// read the CSV file
const data = readFileSync("./Documentação-fisios.csv", "utf-8");

// split the data into lines and parse each line as an object with named properties
const lines = data.split("\n");
const header = lines[0].split(",").map((column) => column.trim());
const records = lines.slice(1).map((line) => {
  const values = line.split(",");
  const record = {};
  for (let i = 0; i < header.length; i++) {
    record[header[i]] = values[i]?.trim();
  }
  return record;
});

// extract the specified columns
const extracted = records
  .filter((record) => record['"PROFISSIONAL"'] !== '""')
  .map((record) => {
    if (record['"PROFISSIONAL"'] !== '""') {
      return {
        "Nome do profissional": record['"PROFISSIONAL"']
          ? record['"PROFISSIONAL"']
          : "",
        Sexo: "",
        "Data de nascimento": "",
        CPF: "",
        "Telefone Cel": record['"TELEFONE PROFISSIONAL"']
          ? record['"TELEFONE PROFISSIONAL"']
          : "",
        Rua: "",
        "Número/complemento": "",
        Bairro: "",
        Cidade: record['"CIDADE"'] ? record['"CIDADE"'] : "",
        Estado: record['"ESTADO"'] ? record['"ESTADO"'] : "",
        Especialidade: record['"ESPECIALIDADE"']
          ? record['"ESPECIALIDADE"']
          : "",
        "Número registro": "",
        Conselho: "",
        "Estado do conselho": "",
        "Matrícula na terceira": "",
        "e-mail": record['"EMAIL"'] ? record['"EMAIL"'] : "",
      };
    } else {
      console.log(record);
    }
  });

// write the extracted data to a new CSV file
const headerRow = Object.keys(extracted[0]).join(",");
const dataRows = extracted.map((record) => {
  if (record) {
    return Object.values(record).join(",");
  }
});
const output = [headerRow, ...dataRows].join("\n");
writeFileSync("output.csv", output);
