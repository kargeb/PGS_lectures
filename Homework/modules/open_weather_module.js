const URL_LEFT_PART = "http://api.openweathermap.org/data/2.5/forecast?q=";
const URL_RIGHT_PART = "&appid=09d095681879bfdc3462857a2653dc8c&units=metric";

function send_to_open_weather(city) {
    let xhr = new XMLHttpRequest();
    let url = URL_LEFT_PART + city + URL_RIGHT_PART;
    let data;
    xhr.open("GET", url); 

    console.log("miasto z modlu: " + city);

    xhr.onload = function() {
        if (xhr.status == 200) {
            console.log("STATUS 200 !!");
            data = JSON.parse(xhr.responseText);
            console.log("data z request: " + data);
            console.log(data);
            
        }

    }
    xhr.onerror = function() {
        console.log("JESTESMY W ERROR");
        data = false;
    }

    xhr.send();
    return data;
    
}

export { send_to_open_weather };