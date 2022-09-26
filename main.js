let period = 5
let searchQuery = ""

document.querySelector("#searchBtn").addEventListener("click", () => {
  searchQuery = document.querySelector("#searchQuery").value;
  console.log(searchQuery)
  if (searchQuery.length != 0) {
    lineChart();
  }
  else {
    document.querySelector("#chartContainer").innerHTML = "";
    document.querySelector("#error").innerHTML = "Error 404";
  }
});

document.querySelectorAll(".btn").forEach((button)=>{
  button.addEventListener("click",()=>{
    if(button.value==="weekly") {
      if(searchQuery.length != 0) {
        period=5;
        lineChart();
      }
    }
    else if(button.value==="monthly") {
      if(searchQuery.length != 0) {
        period=22;
        lineChart();
      }
    }
    else if(button.value==="quaterly") {
      if(searchQuery.length != 0) {
        period=66;
        lineChart();
      }
    }
    else if(button.value==="yearly") {
      if(searchQuery.length != 0) {
        period=264;
        lineChart();
      }
    }
  })
});

function getData(){
    let obj = {
        x: [],
        y : []
    };

    var currencyData = data[searchQuery];
    var dateData = data.Date;

    for(let i=0; i<currencyData.length; i+=period){
        if(currencyData[i] != null){
            obj.x.push( currencyData[i] );
            obj.y.push( dateData[i] );

        }
    }
    return obj;
}

function lineChart() {
  let plotData = getData();
  console.log(plotData)
  let chart = new CanvasJS.Chart("chartContainer", {
    axisX: {
      interval: 1,
      intervalType: "month",
      valueFormatString: "MM YYYY"
    },
    axisY: {
      prefix: "",
      title: "Currency (in "+ searchQuery +")"
    },
    data: [{
      type: "line",
      yValueFormatString: "$###0.00",
      xValueFormatString: "DD MM YYYY",
      dataPoints: plotData
    }]
  });
  chart.render();
};
