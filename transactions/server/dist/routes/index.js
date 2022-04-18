"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = require("../controllers/index");
router.post('/postdata', index_1.inputData);
router.get('/getdata', index_1.getData);
exports.default = router;
