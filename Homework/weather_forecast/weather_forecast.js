 import {   load_from_storage,
            save_in_storage,
            remove_one_item_from_storage } from "../modules/local_storage_module.js";          
import { URL_LEFT_PART, URL_RIGHT_PART, WEATHER_LS_VALUE } from "../modules/constants.js"            
import { average_temp } from "../modules/calculations.js";


(function(){

    var input = document.querySelector("input[name='input_city']");
    // var list = document.querySelector("#list");
    var button_check_weather = document.querySelector("#button_check_weather");
    var button_show_map = document.querySelector("#button_show_map");
    var button_add_city = document.querySelector("#button_add_city");
    var progress = document.querySelector("#progress");
    var map_city = new Map();
    var table = document.querySelector(".table");
    var buttons = document.querySelectorAll(".button");
    


    document.addEventListener("DOMContentLoaded", function(){

        
        progress.classList.add("hide");
        map_city = load_from_storage(WEATHER_LS_VALUE);
        map_city = capitalizeFirstLetter(map_city);
        console.log(map_city);
        show_list_from_map();
        check_weather();
        // console.log(buttons);

    });

    function buttons_off() {

        // button_check_weather.disabled = true;
        // button_show_map.disabled = true;
        console.log(buttons);

        for(let but of buttons) {
            but.classList.add("unactive");
            but.disabled = true;
        }

        // buttons.classList.add("unactive");
        // buttons.disabled = true;
        // button_add_city.classList.add("unactive");
        // button_add_city.disabled = true;
    }

    function buttons_on() {
        // button_check_weather.disabled = false;
        // button_show_map.disabled = false;

        for(let but of buttons) {
            but.classList.remove("unactive");
            but.disabled = false;
        }


        // button_add_city.classList.remove("unactive");
        // button_add_city.disabled = false;
    }


    function capitalizeFirstLetter(map) {
        let temp_map = new Map();

        for(let city of map.keys()) {
            city = city.charAt(0).toUpperCase() + city.slice(1);
            temp_map.set(city);

        }
        return temp_map;
    }

    function show_list_from_map() {
        clear_list();
        let id = 0;
        for(let [key, value] of map_city.entries()) {
            id++;
            fill_list(key, value, id);
        }

        buttons = document.querySelectorAll(".button");
        console.log(buttons);

    }

    function fill_list(city, temp, id) {
        let div_city = document.createElement("div");
        let div_temp = document.createElement("div");
        let div_id = document.createElement("div");
        let div_table_row = document.createElement("div");
        let button_remove = document.createElement("button");
        div_table_row.classList.add("table-row");
        button_remove.classList.add("button", "button3");

        div_id.innerHTML = id;
        div_city.innerHTML = city;
        div_temp.innerHTML = temp;
        button_remove.innerHTML = "Usuń";     

        div_id.classList.add("id");
   
        if(temp) {
            div_temp.innerHTML = temp + " &#8451;";
        }
        //  else {
        //     div_task.innerHTML = city;
        // }        

        div_table_row.appendChild(div_id);
        div_table_row.appendChild(div_city);
        div_table_row.appendChild(div_temp);
        div_table_row.appendChild(button_remove);

        table.appendChild(div_table_row);

    }

    // function fill_list_old(city, temp) {
    //     let div_task = document.createElement("div");
    //     let div_remove = document.createElement("div");
    //     let div_item = document.createElement("div");
    //     div_task.classList.add("task");

    //     if(temp) {
    //         div_task.innerHTML = city + "       " + temp + " &#8451;";
    //     } else {
    //         div_task.innerHTML = city;
    //     }

    //     div_remove.classList.add("remove");
    //     div_remove.innerHTML = "remove";

    //     div_item.appendChild(div_task);
    //     div_item.appendChild(div_remove);
    //     div_item.classList.add("item");

    //     list.appendChild(div_item);
    // }

    function add_city() {
        save_in_storage(input.value.toLowerCase(), WEATHER_LS_VALUE);
        input.value = "";        
        map_city = load_from_storage(WEATHER_LS_VALUE);
        map_city = capitalizeFirstLetter(map_city);
        show_list_from_map();
        check_weather();
    }

    // function clear_list() {
    //     while(list.firstElementChild){
    //         list.removeChild(list.firstElementChild);
    //     }
    // }

    function clear_list() {
        while(table.firstElementChild.nextElementSibling){

            table.removeChild(table.firstElementChild.nextElementSibling);
        }
    }

    // function remove_city_old(target) {
    //     if(confirm("Napewno chcesz usunąć to miasto?")){
    //         let city_to_remove = (target.previousSibling.innerHTML).split(" ");
    //         city_to_remove = city_to_remove[0].toLowerCase();
    //         remove_one_item_from_storage(city_to_remove);
    //         map_city = load_from_storage(WEATHER_LS_VALUE);
    //         map_city = capitalizeFirstLetter(map_city);
    //         show_list_from_map();
    //         if(map_city.size) {
    //             check_weather();
    //         }
    //     };
    // }

    function remove_city(target) {
        if(confirm("Napewno chcesz usunąć to miasto?")){
            // let city_to_remove = (target.previousSibling.innerHTML).split(" ");
            console.log(target);
            console.log(target.previousElementSibling);
            console.log(target.previousElementSibling.previousElementSibling.innerHTML)
            let city_to_remove = ( target.previousElementSibling.previousElementSibling.innerHTML);
            city_to_remove = city_to_remove.toLowerCase();
            remove_one_item_from_storage(city_to_remove);
            map_city = load_from_storage(WEATHER_LS_VALUE);
            map_city = capitalizeFirstLetter(map_city);
            show_list_from_map();
            if(map_city.size) {
                check_weather();
            }
        };
    }    

    // function insert_temp_to_table_old(key, value) {
    //     var items = document.querySelectorAll(".task");

    //     for(let i=0; i< items.length; i++) {
    //         if(items[i].innerHTML == key) {
    //             items[i].innerHTML = items[i].innerHTML + " " + value;
    //             break;
    //         }
    //     }
    // }

    function insert_temp_to_table(key, value) {
        var items = document.querySelectorAll(".table-row");

        for(let i=0; i< items.length; i++) {
            if(items[i].firstElementChild.nextElementSibling.innerHTML == key) {
                items[i].firstElementChild.nextElementSibling.nextElementSibling.innerHTML = value;
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
    

         
                var p = new Promise(function(resolve, reject){   

                    let url = URL_LEFT_PART + key + URL_RIGHT_PART;
                    let data = null;
                    let xmlhttp = new XMLHttpRequest();
                    
                    
                    xmlhttp.open("GET", url);
    
                    
                        xmlhttp.onload = function() {
                            if (xmlhttp.status == 200) {
    
                                data = JSON.parse(xmlhttp.responseText);
                                // temp = Math.trunc(average_temp(data));
                                // map_city.set(key,temp);

                                resolve(data); 

                                ;
                            } else {
                                reject("Nie ma takiego miasta w bazie!");
                            } 
                        }

                        // setTimeout(function(){ 
                        // }, 3000);
                        
                        xmlhttp.send();

                });
    
                

                p.then((data) => { 
                    temp = Math.trunc(average_temp(data));
                    map_city.set(key,temp);
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
    
                
            };
        }

    // function show_map() {
    //     console.log("JESTEM W SZOW MAP");
    //        console.log(map_city.size);
    //        console.log(map_city.values());
    //        console.log(map_city.keys());
    // }

    button_add_city.addEventListener("click", add_city);
    // button_check_weather.addEventListener("click", check_weather);
    // button_show_map.addEventListener("click", show_map);
    // button_show_map.addEventListener("click", function(){
    //     rob_wiersz("albigowa", 30);
    // });

    table.addEventListener("click", function(e){
        if(e.target.innerHTML == "Usuń"){
            remove_city(e.target);
        }
    });

})();
