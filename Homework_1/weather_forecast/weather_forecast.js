(function(){

    var button_add = document.querySelector("input[name='button_add']");
    var input = document.querySelector("input[name='input_city']");
    var list = document.querySelector("#list");
    var button_check_weather = document.querySelector("#button_check_weather");
    var button_show_map = document.querySelector("#button_show_map");
    var map_city = new Map();


////////////////////////////////////  City list - add & remove

    // function fill_map() {
    //     for(var czosz in localStorage){
    //         if(czosz == "length") {
    //             break;
    //         }
    //       r map_city.set
    //     }    
    // }

    function load_from_local_storage(map) {
        map = new Map();
        if(localStorage.length) {
            for(let key in localStorage ) {
                    if(key == "length") {
                        break;
                    }        
                map.set(key);
            }
        } else {
            console.log("local storage puste ni ma nic");
        }

        console.log(localStorage);
        console.log(map);

        return map;
    }

    function show_list_from_map(map) {
        for(let key of map) {
            console.log("klucz z ahowformmap" + map.get(key) + " i wartosc");
            console.log(key);
            // console.log(map.keys() + " " + map.values());
            fill_list(key);
        }
    }


    function show_list() {
        clear_list();
            for(var czosz in localStorage){
                if(czosz == "length") {
                    break;
                }
                fill_list(czosz);
            }
    }

    function add_item(){
        localStorage.setItem(input.value, "whether");
        input.value = "";
        show_list();
    }

    function fill_list(text) {
        let div_task = document.createElement("div");
        let div_remove = document.createElement("div");
        let div_item = document.createElement("div");
        div_task.classList.add("task");
        div_task.innerHTML = text;
        div_remove.classList.add("remove");
        div_remove.innerHTML = "remove";

        div_item.appendChild(div_task);
        div_item.appendChild(div_remove);
        div_item.classList.add("item");

        list.appendChild(div_item);
    }

    function clear_list() {
        while(list.firstElementChild){
            list.removeChild(list.firstElementChild);
        }
    }


    function remove_item_from_storage(remove_target){

        if(confirm("Napewno chcesz usunąć to miasto?")){
            localStorage.removeItem(remove_target.previousSibling.innerHTML);
            remove_target.parentNode.remove();
        };
    }

    list.addEventListener("click", function(e){
        if(e.target.innerHTML == "remove"){
            remove_item_from_storage(e.target);
        }
    });

/////////////////////////////////////////////////////////////////////

    // document.addEventListener("DOMContentLoaded", show_list);
    // document.addEventListener("DOMContentLoaded", load_from_local_storage);

    document.addEventListener("DOMContentLoaded", function(){

        console.log(map_city);

        map_city = load_from_local_storage();
        
        console.log(map_city);
        show_list_from_map(map_city);



    });


    function send_data(city) {
        let url = "http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=09d095681879bfdc3462857a2653dc8c&units=metric";
        let data = null;
        let xmlhttp = new XMLHttpRequest();

        console.log("JESTEM W KURWA FUNKCJI");

        xmlhttp.open("GET", url, true);

        xmlhttp.onreadystatechange = function() {

            if  (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                data = JSON.parse(xmlhttp.responseText);
            } 

        };

        xmlhttp.onloadend = function() {
            console.log("Wczytalo sie:");
            console.log(data);
            console.log(data.city.name);
         map_city.set(data.city.name,average_temp(data));
        }

        xmlhttp.send();
    }

    function check_weather() {

        for(let city in localStorage) {
            if(city == "length") {
                break;
            }
            send_data(city);
        }
        show_map();
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
           map_city.values();
           map_city.keys();
        for(let each in map_city.entries()){
            console.log(each);
        }
    }


    button_add.addEventListener("click", add_item);
    button_check_weather.addEventListener("click", check_weather);
    button_show_map.addEventListener("click", show_map);
})();