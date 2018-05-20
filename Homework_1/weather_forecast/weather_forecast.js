(function(){

    var input = document.querySelector("input[name='input_city']");
    var list = document.querySelector("#list");
    var button_check_weather = document.querySelector("#button_check_weather");
    var button_show_map = document.querySelector("#button_show_map");
    var button_add_city = document.querySelector("#button_add_city");
    var map_city = new Map();
    var h3 = document.querySelector("h3");


////////////////////////////////////  City list - add & remove
    
 //--------------------------------------------------------------------------------   

    function load_from_local_storage() {
        let map = new Map();
        if(localStorage.length) {
            for(let key in localStorage ) {
                    if(key == "length") {
                        break;
                    }        

                map.set( capitalizeFirstLetter(key));
            }
        } else {
            console.log("local storage puste ni ma nic");
        }

        return map;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function show_list_from_map() {
        clear_list();
        for(let [key, value] of map_city.entries()) {
            fill_list(key, value);
        }
    }

    function fill_list(city, temp) {
        let div_task = document.createElement("div");
        let div_remove = document.createElement("div");
        let div_item = document.createElement("div");
        div_task.classList.add("task");

        if(temp) {
            div_task.innerHTML = city + "       " + temp + " &#8451;";
        } else {
            div_task.innerHTML = city;
        }

        div_remove.classList.add("remove");
        div_remove.innerHTML = "remove";

        div_item.appendChild(div_task);
        div_item.appendChild(div_remove);
        div_item.classList.add("item");

        list.appendChild(div_item);
    }

    function add_city() {
        localStorage.setItem(input.value, "whether");
        input.value = "";        
        map_city = load_from_local_storage();
        show_list_from_map();
    }

    function clear_list() {
        while(list.firstElementChild){
            list.removeChild(list.firstElementChild);
        }
    }

    function remove_city(target) {
        if(confirm("Napewno chcesz usunąć to miasto?")){
            console.log(target.previousSibling.innerHTML)
            localStorage.removeItem(target.previousSibling.innerHTML);
            map_city =  load_from_local_storage();
            show_list_from_map();
            // remove_target.parentNode.remove();
        };
    }


/////////////////////////////////////////////////////////////////////


    document.addEventListener("DOMContentLoaded", function(){

        map_city = load_from_local_storage();
        // check_weather();
        
        show_map();
        show_list_from_map();
        check_weather();
        
        // insert_temp_to_table();

    });

    function insert_temp_to_table(key, value) {
        console.log(list);
        var items = document.querySelectorAll(".task");

        for(let i=0; i< items.length; i++) {
            console.log("i = " + i);
            if(items[i].innerHTML == key) {
                console.log(key + " jest na poz: " + i);
                items[i].innerHTML = items[i].innerHTML + " " + value;
                break;
            }
        }


        // console.log(items);
        // console.log(items[4]);
        // console.log(items[4].innerHTML = items[4].innerHTML + " dupa dupa dupa");
    }


    function send_data(city) {
        let temp;
        let city_name;
        let url = "http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=09d095681879bfdc3462857a2653dc8c&units=metric";
        let data = null;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", url);

        // xmlhttp.onreadystatechange = function() {

        //     if  (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //         data = JSON.parse(xmlhttp.responseText);
        //     } 

        // };
         var p = new Promise(function(resolve, reject){   

                    xmlhttp.onload = function() {
                        if (xmlhttp.status == 200) {

                            data = JSON.parse(xmlhttp.responseText);
                            temp = Math.trunc(average_temp(data));
                            map_city.set(city,temp);

                            // console.log("temp z onlad " + temp);
                             resolve(temp);

                        } else {
                            // reject("error");
                        }
                    }
            });

            p.then((temp) => { 
                console.log("z promuise: " + temp);
                console.log("dupa z promise innne");
                console.log("dane dla tego prmisa: " + city + temp);
                insert_temp_to_table(city, temp);

             });

        xmlhttp.send();

    }

    function check_weather() {

            for (let key of map_city.keys()) {

                

                 send_data(key);

            };

        //  show_map();
        //  show_list_from_map();

    }

    function average_temp(data) {

        let temp = 0;
        for(let i=0; i<data.list.length; i++) {
            temp += data.list[i].main.temp
        }
        console.log("suma temperatur = " + temp);
        temp = temp/data.list.length;
        console.log("srednia = " + temp);
        return temp;
    }

    function show_map() {
        console.log("JESTEM W SZOW MAP");
           console.log(map_city.values());
           console.log(map_city.keys());
    }

    button_add_city.addEventListener("click", add_city);
    button_check_weather.addEventListener("click", check_weather);
    button_show_map.addEventListener("click", show_map);

    list.addEventListener("click", function(e){
        if(e.target.innerHTML == "remove"){
            remove_city(e.target);
        }
    });
})();