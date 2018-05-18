(function(){

    var button_add = document.querySelector("input[name='button_add']");
    var input = document.querySelector("input[name='input_city']");

    console.log(button_add);
    console.log(input);


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


    button_add.addEventListener("click", add_item);

    document.addEventListener("DOMContentLoaded", show_list);



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