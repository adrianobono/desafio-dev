"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const { Pool } = require('pg');
const { Client } = require('pg');
exports.client = new Client({
    connectionString: 'postgres://vglovhctkyegug:2ca02fd98250c154f4f789e1722b14e123b090c78ee1d5d9d0018afbc5c37fff@ec2-52-203-118-49.compute-1.amazonaws.com:5432/d24n22nb1qa18f',
    ssl: {
        rejectUnauthorized: false
    }
});
