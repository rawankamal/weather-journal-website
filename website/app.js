// const { json } = require("body-parser");
// const { runInContext } = require("vm");

const generateBtn = document.querySelector("#genBtn");
const zip = document.querySelector("#Zip");
const feelings = document.querySelector("#Feelings");
const feelingsParagraph = document.querySelector(".feelings");
const temp = document.querySelector("#Temp");
const currentDate = document.querySelector("#currentDate");
const newDate = new Date();
const date = newDate.toDateString();

const example = "api.openweathermap.org/data/2.5/weather?zip={zip code},&appid={API key}";
const baseURI = "https:/api.openweathermap.org/data/2.5/weather?zip=";

const key = "&appid=bfbad8984611c55649b7641b533c06d6&units=imperial";

generateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const madeURI = `${baseURI}${zip.value}${key}`;
    getData(madeURI)
    .then((data) =>{
        cureData(data)
        .then((info) => {
            postData("/add", info)
            .then((data) => {
                retrieveData("/all")
                .then((data) => {
                    updateUI(data);
                });
            });
        });
    });
});

// api
const getData = async (url) => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        if(data.cod == 200) {
            return data;
        }
        else {
            console.log(data.message);
            return data;
        }
        
    }
    catch(e) {
        console.log(e);
    }
}

// cure data
const cureData = async (data) => {
    try {
        if (data.message){
            return data;
        }
        else {
            const info = {
                date,
                feelings: feelings.value,
                temp: data.main.temp
            };
            return info;
        }
    }
    catch (err) {
        console.log(err);
    }
};
// post data function
const postData = async (url="", data={}) => {
    const result = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(data), //error

    });
    try{
        const response = await result.json();
        return response;
    }
    catch (err) {
        console.error(err);
    }
};

// retrieve data 
const retrieveData = async (url) => {
    const data = await fetch(url)
    try {
        const response = await data.json();
        return response;
    }
    catch (err) {
        console.error(err);
    }
};
// update UI function
const updateUI = async (data) => {
    const response = await data;
    if (response.date) {
        document.getElementById("Error").style.display = "none";
        document.querySelector(".outputs").style.display = "block";
        currentDate.innerHTML = ("Date : " + response.date) ;
        temp.innerHTML = ("Temperature : " + response.temp);
        feelingsParagraph.innerHTML = response.feelings? response.feelings: "What do you feel? ";
    }
    else {
        document.getElementById("Error").style.display = "block";
        document.querySelector(".outputs").style.display = "none";
        document.querySelector('#Error').innerHTML = response.message;
    }
};
