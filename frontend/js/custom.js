const api = "https://api.exchangerate-api.com/v4/latest/USD";
function getResult() {
    fetch(`${api}`).then(currency=>{
        return currency.json();
    }).then(displayResults);
}