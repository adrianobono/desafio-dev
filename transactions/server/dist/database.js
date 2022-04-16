"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const { Pool } = require('pg');
exports.pool = new Pool({
    user: 'vglovhctkyegug',
    host: 'ec2-52-203-118-49.compute-1.amazonaws.com',
    password: '2ca02fd98250c154f4f789e1722b14e123b090c78ee1d5d9d0018afbc5c37fff',
    database: 'd24n22nb1qa18f',
    port: 5432
});
