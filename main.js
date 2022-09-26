let period = 5
let searchQuery = ""
let smallData = [];
const dDate = data.Date;

document.querySelector("#searchBtn").addEventListener("click", () => {
  smallData = []
  searchQuery = document.querySelector("#selectDropdown").value;
  console.log(searchQuery);
  if (searchQuery.length != 0) {
    let currencyData = data[searchQuery];
    var curSize = Object.keys(currencyData).length;
    console.log("Vaibhav size",curSize);
    for(var i=0;i<curSize;i++){
      if(currencyData[i] != null){
        var obj = {
          x : new Date(dDate[i]),
          y : currencyData[i]
        }
        smallData.push(obj);
      }
    }
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
    let dataToUse = [];

    console.log("small data is : ",smallData.length);
    for(var i=0;i<smallData.length;i+=period){
      const obj = {
        x : smallData[i].x,
        y : smallData[i].y
      }
      dataToUse.push(obj);
    }
    console.log();
    console.log("getData()",dataToUse);
    return dataToUse;
}

function lineChart() {
  let plotData = getData();

  console.log(plotData)
  let chart = new CanvasJS.Chart("chartContainer", {
    axisX: {
      interval: 1,
      intervalType: "year",
      valueFormatString: "YYYY"
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
