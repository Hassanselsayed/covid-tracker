window.onload = function () {
    getData();
};


const getData = async () => {
    const response = await fetch("https://coronavirus-19-api.herokuapp.com/countries");
    const dataInJson = await response.json(); 

    const newCountryList = [];
    dataInJson.forEach((country) => {
        const countryName = country.country;
        newCountryList.push(countryName);
    });

    newCountryList.sort();
    newCountryList.forEach((country) => {
        const node = document.createElement("option");
        const textnode = document.createTextNode(country);
        node.appendChild(textnode);
        document.getElementById("locationSelect").appendChild(node);
    });

}

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

document.getElementById("submitButton").onclick = async function (event) {
    event.preventDefault();

    document.getElementById("results").innerHTML = "";

    const select = document.getElementById("locationSelect");
    const selectedCountry = select.options[select.selectedIndex].text;

    if(selectedCountry === "Country") {
        alert("Please choose a country first");
    }
    
    else {

        const response = await fetch(`https://coronavirus-19-api.herokuapp.com/countries/${selectedCountry}`);
        const jsonData = await response.json();
        

    
        
        const resultsHeaderNode = document.createElement("h3");
        const resultsHeaderText = document.createTextNode(`Covid status as of ${today} in ${selectedCountry}`);
        resultsHeaderNode.appendChild(resultsHeaderText);
        document.getElementById("results").appendChild(resultsHeaderNode);
    
        const newConfirmedNode = document.createElement("p");
        newConfirmedNode.setAttribute("id", "newConfirmedChoose");
        const newConfirmedtext = document.createTextNode(`New confirmed cases: ${jsonData.todayCases}`);
        newConfirmedNode.appendChild(newConfirmedtext);
        document.getElementById("results").appendChild(newConfirmedNode);
    
        const newDeathsNode = document.createElement("p");
        newDeathsNode.setAttribute("id", "newDeathsChoose");
        const newDeathsText = document.createTextNode(`New deaths: ${jsonData.todayDeaths}`);
        newDeathsNode.appendChild(newDeathsText);
        document.getElementById("results").appendChild(newDeathsNode);
    
        
        const totalConfirmedNode = document.createElement("p");
        totalConfirmedNode.setAttribute("id", "totalConfirmedChoose");
        const totalConfirmedText = document.createTextNode(`Total confirmed cases: ${jsonData.cases}`);
        totalConfirmedNode.appendChild(totalConfirmedText);
        document.getElementById("results").appendChild(totalConfirmedNode);
        
        const totalActiveNode = document.createElement("p");
        totalActiveNode.setAttribute("id", "totalActiveChoose");
        const totalActiveText = document.createTextNode(`Total active cases: ${jsonData.active}`);
        totalActiveNode.appendChild(totalActiveText);
        document.getElementById("results").appendChild(totalActiveNode);
        
        const totalRecoveredNode = document.createElement("p");
        totalRecoveredNode.setAttribute("id", "totalRecoveredChoose");
        const totalRecoveredText = document.createTextNode(`Total recovered: ${jsonData.recovered}`);
        totalRecoveredNode.appendChild(totalRecoveredText);
        document.getElementById("results").appendChild(totalRecoveredNode);

        const totalDeathsNode = document.createElement("p");
        totalDeathsNode.setAttribute("id", "totalDeathsChoose");
        const totalDeathsText = document.createTextNode(`Total deaths: ${jsonData.deaths}`);
        totalDeathsNode.appendChild(totalDeathsText);
        document.getElementById("results").appendChild(totalDeathsNode);
    }
};

// assign function to onclick property of checkbox
document.querySelectorAll("input[type=checkbox]").forEach(button => {
    button.onclick = function () {
        const buttonValue = this.value;
        const text = document.getElementById(buttonValue);
        if (this.checked) {
            text.style.display = "block";
        } else {
            text.style.display = "none";
        }
    };
})