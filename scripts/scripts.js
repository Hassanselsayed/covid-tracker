window.onload = function () {
    getData();
};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
const getData = async () => {
    const response = await fetch('https://api.covid19api.com/summary');
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

document.getElementById("submitButton").onclick = async function () {
    const e = document.getElementById("locationSelect");
    const strUser = e.options[e.selectedIndex].text;

    const response = await fetch(`https://api.covid19api.com/Canada`);
    const myJson = await response.json(); //extract JSON from the http response

    console.log(myJson);

    // const newcountryList = myJson.Countries;

    // newcountryList.forEach((country) => {
    //     const node = document.createElement("option");
    //     const textnode = document.createTextNode(country.Country);
    //     node.appendChild(textnode);
    //     document.getElementById("locationSelect").appendChild(node);
    // });
};