const express = require("express");
const documentation = require("../modules/documentation");
const supply = require("../modules/supply");
const balance = require("../modules/balance");
const transfer = require('../modules/transfer');
const routes= express.Router();

routes.get('/', documentation);
routes.get('/transfer', supply);
routes.get('/balance', balance);
// routes.get('/transfer', transfer);

module.exports = routes;