let period = 5
let searchQuery = ""
let smallData = [];
const dDate = data.Date;
let smallDataToUse =[]

// console.log(data);
document.querySelector("#searchBtn").addEventListener("click", () => {
  smallData = []
  searchQuery = document.querySelector("#searchQuery").value;
  console.log(searchQuery);
  if (searchQuery.length != 0) {
    // lineChart();
    let currencyData = data[searchQuery];
    // console.log("Zero : ",currencyData); // this is working
    // console.log("crr Data len is : ",dataDate.size);
    // console.log("WHo date",dataDate);
    // console.log("crr Data len is : ",currencyData.size);
    // console.log("cur Data",currencyData);
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
    // var yr1 = Number(button.value.slice(3,2));
    // console.log(button.value);
    // var yr1 = button.value.toString().slice(2,2);

    var yr1 = (button.value.toString()[3] + button.value.toString()[4]);
    console.log(yr1);
    var flag = false;
    // console.log("its small",smallData.length);
    for(i=0;i<smallData.length;i++){
      var curYear = smallData[i].x.toString()[13]+smallData[i].x.toString()[14];
      if(curYear==yr1){
        flag = true;
        console.log("is in??");
        while( i < smallData.length &&  (smallData[i].x.toString()[13]+smallData[i].x.toString()[14])==yr1){
          var obj = {
            x : smallData[i].x,
            y : smallData[i].y
          }
          smallDataToUse.push(obj);
          console.log("in??");
          i++;
        }
      }
      if(flag)break;
    }
    if(smallDataToUse.length != 0){
        console.log("WHO??");
        yearLineChart();
    }
  });
});

function getData(){
    let dataToUse = [];

    // let currencyData = data[searchQuery];
    // let dateData = data.Date;
    // for(let i=0; i<currencyData.length; i+=period){
    //     if(currencyData[i] != null){
    //         var obj = {

    //         }
    //         obj.x.push( currencyData[i] );
    //         obj.y.push( dateData[i] );

    //     }
    // }
    console.log("small data is : ",smallData.length);
    for(var i=0;i<smallData.length;i+=period){
      const obj = {
        x : smallData[i].x,
        y : smallData[i].y
      }
      dataToUse.push(obj);
    }
    // console.log();
    // console.log("getData()",dataToUse);
    return dataToUse;
}

function lineChart() {
  let plotData = getData();

  // console.log(plotData)
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
  // console.log("night",plotData)
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

