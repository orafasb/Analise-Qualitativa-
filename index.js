window.addEventListener("load", () => {
  interactionBar()
  let obj = {
    "Alo": 0,
    "Cpc": 0,
    "Cpca": 0,
    "Pp": 100
  }
  atualizarGrafico(obj)
})

//Capturar nome usuario
let interactionBar = () => {
  do {
    nome = prompt("Digite seu nome!");
  }
  while (nome === null || nome === "") {
    document.getElementById("alert").innerHTML = `Olá ${nome}. Seja bem vindo(a) ao 
    GrupoServices. Digite uma UF no campo acima para  visualizar os graficos de 
    ALO, CPC, CPA e PP de cada estado.`

  }
}
//Evitar tecla enter para recarregar pagina
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    alert("Você deve clicar em Buscar")
    return false;
  }
})


//capturar input e fazer requisicao http do backend.
document.getElementById("button").onclick = function (input) {
  if (input = document.getElementById("input").value === "") {
    alert("Digite o UF ")
    document.getElementById("alert").innerHTML = `${nome}, você deve digitar um UF`
    return
  } else {
    input = document.getElementById("input").value
    document.getElementById("alert").innerHTML = `Legal ${nome}, os dados acima são referentes ao estado:  ${input}`
    var url = "http://localhost:3000/?estado=" + input;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    dados = xhttp.response;
    let dadosBrutos = JSON.parse(dados);
    console.log(dadosBrutos);
    if (dadosBrutos.Alo === 0) {
      alert("A UF informado é invalida")
      document.getElementById("alert").innerHTML = `Ops!!! ${nome}, os dados informados sao invalidos  `

      return
    }

    return atualizarGrafico(dadosBrutos);//Dados para popular graficos 
  }



}


//Funcao com grafico inserido para atualizacao.
function atualizarGrafico(dadosBrutos) {
  if (!dadosBrutos) return;

  am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);

    // Add data
    chart.data = [{

      "data": "Alo",
      "valor": dadosBrutos.Alo
    }, {
      "data": "Cpc",
      "valor": dadosBrutos.Cpc
    }, {
      "data": "Cpca",
      "valor": dadosBrutos.Cpca
    }, {
      "data": "Pp",
      "valor": dadosBrutos.Pp
    }
    ];

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "valor";
    pieSeries.dataFields.category = "data";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);


  });
}
