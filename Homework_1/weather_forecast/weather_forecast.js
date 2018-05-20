(function(){

    var input = document.querySelector("input[name='input_city']");
    var list = document.querySelector("#list");
    var button_check_weather = document.querySelector("#button_check_weather");
    var button_show_map = document.querySelector("#button_show_map");
    var button_add_city = document.querySelector("#button_add_city");
    var progress = document.querySelector("#progress");
    var map_city = new Map();


////////////////////////////////////  City list - add & remove
    
 //--------------------------------------------------------------------------------   

    document.addEventListener("DOMContentLoaded", function(){

        progress.classList.add("hide");
        map_city = load_from_local_storage();
        if(map_city.size) {
            show_list_from_map();
            check_weather();
        }

    });


    function buttons_off() {
        button_check_weather.disabled = true;
        button_show_map.disabled = true;
        button_add_city.disabled = true;
    }

    function buttons_on() {
        button_check_weather.disabled = false;
        button_show_map.disabled = false;
        button_add_city.disabled = false;
    }

    function load_from_local_storage() {
        let map = new Map();
        if(localStorage.length) {
            for(let key in localStorage ) {
                    if(key == "length") {
                        break;
                    } else if ( localStorage.getItem(key) == "city") {
                        map.set( capitalizeFirstLetter(key));
                    }       
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
        localStorage.setItem(input.value, "city");
        input.value = "";        
        map_city = load_from_local_storage();
        show_list_from_map();
        check_weather();
    }

    function clear_list() {
        while(list.firstElementChild){
            list.removeChild(list.firstElementChild);
        }
    }

    function remove_city(target) {
        if(confirm("Napewno chcesz usunąć to miasto?")){
            let city_to_remove_arr = (target.previousSibling.innerHTML).split(" ");
            localStorage.removeItem(city_to_remove_arr[0].toLowerCase());
            map_city =  load_from_local_storage();
            show_list_from_map();
            if(map_city.size) {
                check_weather();
            }
        };
    }


/////////////////////////////////////////////////////////////////////


    function insert_temp_to_table(key, value) {
        var items = document.querySelectorAll(".task");

        for(let i=0; i< items.length; i++) {
            if(items[i].innerHTML == key) {
                items[i].innerHTML = items[i].innerHTML + " " + value;
                break;
            }
        }
    }


    function check_weather() {
        let temp;
        let city_name;

        progress.classList.remove("hide");
        // progress.classList.add("show");
        let counter = 0;
        progress.value = 0;
        progress.max = map_city.size;
        buttons_off();

        for (let key of map_city.keys()) {

            let url = "http://api.openweathermap.org/data/2.5/forecast?q="+ key + "&appid=09d095681879bfdc3462857a2653dc8c&units=metric";
            let data = null;
            let xmlhttp = new XMLHttpRequest();
            
            xmlhttp.open("GET", url);
     
            var p = new Promise(function(resolve, reject){   

                
                    xmlhttp.onload = function() {
                        if (xmlhttp.status == 200) {

                            data = JSON.parse(xmlhttp.responseText);
                            temp = Math.trunc(average_temp(data));
                            map_city.set(key,temp);

                            resolve(temp);
                        } else {
                            reject("Nie ma takiego miasta w bazie!");
                        } 
                    }
            });

            p.then((temp) => { 
                
                insert_temp_to_table(key, temp + "&#8451;");
                counter++;
                progress.value = counter;
                if(counter == map_city.size) {
                    buttons_on();
                    progress.classList.add("hide");
                }
            }, (error) => { 
                console.log(error); 
                insert_temp_to_table(key, error);
                counter++;
                progress.value = counter;
                if(counter == map_city.size) {
                    buttons_on();
                    progress.classList.add("hide");
                }

            });

            xmlhttp.send();
        };
    }

    function average_temp(data) {

        let temp = 0;
        for(let i=0; i<data.list.length; i++) {
            temp += data.list[i].main.temp
        }
        temp = temp/data.list.length;
        return temp;
    }

    function show_map() {
        console.log("JESTEM W SZOW MAP");
           console.log(map_city.size);
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

        // var removes = document.querySelectorAll(".remove");
        // console.log(removes);
        // for(let rem of removes){
        //     rem.classList.add("promise");
        // }  