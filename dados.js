let express = require("express");
const app = express();
let fs = require('fs');
const { parse } = require("path");
const { isNull } = require("util");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  if (req.query["estado"]) {
    let result = doMap(req.query["estado"].toUpperCase());
    res.send(JSON.stringify(result));
  } else if (req.query["dia"]) {
    let result = doMap2(req.query["dia"]);
    res.send(JSON.stringify(result));
  }
});

app.listen(3000, function () {
  console.log("API Started!");
});

function doMap(estado) {
  let dados = require("./Planilha1.json");
  let manipulados = dados.Planilha1

  obj = {
    Alo: 0,
    Cpc: 0,
    Cpca: 0,
    Pp: 0,
  };

  manipulados.filter((person) => {
    return person.UF === estado && person.VALOR !== "0";

  }).map((person) => {
    obj.Alo += parseInt(person.ALO);
    obj.Cpc += parseInt(person.CPC);
    obj.Cpca += parseInt(person.CPCA);
    obj.Pp += parseInt(person.PP);
  });
  return obj
};
