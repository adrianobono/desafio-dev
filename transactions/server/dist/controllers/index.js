"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputData = void 0;
const database_1 = require("../database");
const format = require('pg-format');
const { v4: uuidv4 } = require('uuid');
const parseData = (data) => {
    const ruleparser = [1, 10, 21, 33, 46, 53, 68, 89];
    return data.map((item) => {
        ruleparser.forEach((indice) => {
            item = [
                item.slice(0, indice).trim(),
                item.slice(indice).trim(),
            ].join(indice < 80 ? ";" : "");
        });
        item = item.split(";");
        item[2] = (Number(item[2]) / 100).toFixed(2);
        item[1] = new Date(parseInt(item[1].substr(0, 4)), parseInt(item[1].substr(4, 2)), parseInt(item[1].substr(6, 2)), parseInt(item[5].substr(0, 2)), parseInt(item[5].substr(2, 4)), parseInt(item[5].substr(4, 6)));
        item[5] = item[1].getTime();
        item.push(uuidv4());
        return item;
    });
};
const inputData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let rows = parseData(req.body);
    if (rows) {
        database_1.client.connect();
        database_1.client.query('TRUNCATE TABLE transactions');
        const response = yield database_1.client.query(format('INSERT INTO transactions (tipo, data, valor, cpf, cartao, hora, dono, loja, id) VALUES %L', rows), [], (err, result) => {
            console.log(err);
            console.log(result);
        });
    }
    res.json({ message: "ok" });
});
exports.inputData = inputData;
