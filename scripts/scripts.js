window.onload = function () {
    getData();
};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
const getData = async () => {
    const response = await fetch("https://api.covid19api.com/summary");
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    const newcountryList = myJson.Countries;

    newcountryList.forEach((country) => {
        const node = document.createElement("option");
        const textnode = document.createTextNode(country.Country);
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

        const response = await fetch(`https://api.covid19api.com/summary`);
        const jsonData = await response.json(); //extract JSON from the http response
    
        const allData = jsonData.Countries;
    
        const countryData = allData.filter((country) => {
            
            return country.Country === selectedCountry;
        })
    
        const countryObject = countryData[0];
    
        const resultsHeaderNode = document.createElement("h3");
        const resultsHeaderText = document.createTextNode(`Covid status as of ${today} in ${selectedCountry}`);
        resultsHeaderNode.appendChild(resultsHeaderText);
        document.getElementById("results").appendChild(resultsHeaderNode);
    
        const newConfirmedNode = document.createElement("p");
        const newConfirmedtext = document.createTextNode(`New confirmed cases: ${countryObject.NewConfirmed}`);
        newConfirmedNode.appendChild(newConfirmedtext);
        document.getElementById("results").appendChild(newConfirmedNode);
    
        const newDeathsNode = document.createElement("p");
        const newDeathsText = document.createTextNode(`New deaths: ${countryObject.NewDeaths}`);
        newDeathsNode.appendChild(newDeathsText);
        document.getElementById("results").appendChild(newDeathsNode);
    
        const newRecoveredNode = document.createElement("p");
        const newRecoveredText = document.createTextNode(`New recovered: ${countryObject.NewRecovered}`);
        newRecoveredNode.appendChild(newRecoveredText);
        document.getElementById("results").appendChild(newRecoveredNode);
    
        const totalConfirmedNode = document.createElement("p");
        const totalConfirmedText = document.createTextNode(`Total confirmed cases: ${countryObject.TotalConfirmed}`);
        totalConfirmedNode.appendChild(totalConfirmedText);
        document.getElementById("results").appendChild(totalConfirmedNode);
    
        const totalDeathsNode = document.createElement("p");
        const totalDeathsText = document.createTextNode(`Total deaths: ${countryObject.TotalDeaths}`);
        totalDeathsNode.appendChild(totalDeathsText);
        document.getElementById("results").appendChild(totalDeathsNode);
    
        const totalRecoveredNode = document.createElement("p");
        const totalRecoveredText = document.createTextNode(`Total recovered: ${countryObject.TotalRecovered}`);
        totalRecoveredNode.appendChild(totalRecoveredText);
        document.getElementById("results").appendChild(totalRecoveredNode);
    }
};