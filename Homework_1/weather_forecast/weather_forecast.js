(function(){

    console.log("Nadupcamy prognoze");

    var button_add = document.querySelector("input[name='button_add']");
    var input = document.querySelector("input[name='input_city']");

    console.log(button_add);
    console.log(input);

    function add_to_list(city) {
        
    }


    button_add.addEventListener("click")





    var city = "olsztyn";
    var url = "http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=09d095681879bfdc3462857a2653dc8c&units=metric";
    var data;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if  (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            data = JSON.parse(xmlhttp.responseText);
        } else {
            console.log("chuj blont " + xmlhttp.readyState);
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();


    console.log(data.list.length);

    console.log(data.city.name);

    for(var i=0; i<data.list.length; i++) {
        console.log(data.list[i].main.temp);
        console.log(data.list[i].dt_txt);
    }
})();