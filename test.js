let period = 5
let searchQuery = ""
let smallData = [];
const dDate = data.Date;
let smallDataToUse =[]

document.querySelector("#searchBtn").addEventListener("click", () => {
  smallData = []
  searchQuery = document.querySelector("#selectDropdown").value;
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

  console.log(smallData);
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
    button.addEventListener('click', ()=>{
        smallDataToUse = [];
        var buttonName = button.value;
        var yr1 = Number(buttonName.slice(3,2));
        var yr2 = Number(buttonName.slice(6,2));
        var flag = false;
        for(i=0;i<smallData.length;i++){
            if(smallData[i].x.getYear().toString()===yr1){
            while( i < smallData.length &&  smallData[i]===yr1){
                var obj = {
                x : smallData[i].x,
                y : smallData[i].y
                }
                smallDataToUse.push(obj);
                i++;
            }
            flag = true;
            }
            if(flag)break;
        }
        if(smallDataToUse.length != 0){
            yearLineChart();
        }
    });
});

function getData(){
    let dataToUse = [];

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

  let chart = new CanvasJS.Chart("YearChartContainer", {
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
