let period = 5
let searchQuery = ""
const dDate = data.Date;
let smallData = [];
let smallDataToUse =[]


document.querySelector("#searchBtn").addEventListener("click", () => {
  smallData = []
  searchQuery = document.querySelector("#searchQuery").value;
  if (searchQuery.length != 0) {
    let currencyData = data[searchQuery];
    var curSize = Object.keys(currencyData).length;
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

document.querySelectorAll(".btn-year").forEach((button)=>{
  button.addEventListener("click",()=>{
    smallDataToUse = [];

    var startYear = button.value;
    var flag = false;
    for(i=0;i<smallData.length;i++){
      var curYear = smallData[i].x.toString()[13] + smallData[i].x.toString()[14];
      if(curYear == startYear){
        flag = true;
        while( i < smallData.length &&  (smallData[i].x.toString()[13]+smallData[i].x.toString()[14]) == startYear){
          var obj = {
            x : smallData[i].x,
            y : smallData[i].y
          }
          smallDataToUse.push(obj);
          i++;
        }
      }
      if(flag) break;
    }
    if(smallDataToUse.length != 0){
        yearLineChart();
    }
  });
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
    return dataToUse;
}

function lineChart() {
  let plotData = getData();

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

function yearLineChart() {
  let plotData = smallDataToUse;
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