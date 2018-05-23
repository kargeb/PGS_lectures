import { save_in_storage, 
        load_from_storage,
        clear_storage,
        remove_one_item_from_storage } from "../modules/local_storage_module.js";

import { TODO_LS_VALUE } from "../modules/constants.js";       

(function(){

    // var button_clear_list = document.querySelector("#button_clear_list");
    // var button_show_list = document.querySelector("#button_show_list");
    // var button_clear_storage = document.querySelector("#button_clear_storage");
    // var list = document.querySelector("#list");

    var add = document.querySelector("#button_add_task");
    var input = document.querySelector("input[name='input_task']");
    var table = document.querySelector(".todo-table");

    let tasks = new Set();


    function show_list() {
        // clear_list();
        clear_list();
        tasks = load_from_storage( TODO_LS_VALUE );
        console.log(tasks);
        for(let task of tasks.keys()) {
            // fill_list(task);
            fill_list(task);
        }
    }

    function add_item(){
        save_in_storage(input.value, TODO_LS_VALUE );
        input.value = "";
        show_list();
    }

    // function fill_list(text) {
    //     let div_task = document.createElement("div");
    //     let div_remove = document.createElement("div");
    //     let div_item = document.createElement("div");
    //     div_task.classList.add("task");
    //     div_task.innerHTML = text;
    //     div_remove.classList.add("remove");
    //     div_remove.innerHTML = "remove";

    //     div_item.appendChild(div_task);
    //     div_item.appendChild(div_remove);
    //     div_item.classList.add("item");

    //     list.appendChild(div_item);
    // }

    function fill_list(text) {
        let div_task = document.createElement("div");
        let remove_button = document.createElement("button");
        let div_table_row = document.createElement("div");

        // div_task.classList.add("task");
        div_table_row.classList.add("todo-table-row");
        div_task.innerHTML = text;
        remove_button.classList.add("button", "button3");
        remove_button.innerHTML = "Usuń";

        div_table_row.appendChild(div_task);
        div_table_row.appendChild(remove_button);
        table.appendChild(div_table_row);

        // div_item.appendChild(div_task);
        // div_item.appendChild(div_remove);
        // div_item.classList.add("item");

        // list.appendChild(div_item);
    }    



    // function clear_list() {
    //     while(list.firstElementChild){
    //         list.removeChild(list.firstElementChild);
    //     }
    // }

    function clear_list() {
        while(table.firstElementChild){
            table.removeChild(table.firstElementChild);
        }
    }

    // function remove_element(remove_target){
    //     if(confirm("Napewno chcesz usunąć to zadanie?")){
    //         let item = remove_target.previousSibling.innerHTML;
    //         remove_one_item_from_storage(item);
    //         remove_target.parentNode.remove();
    //     };
    // }


    function remove_element(remove_target){
        if(confirm("Napewno chcesz usunąć to zadanie?")){
            let item = remove_target.previousElementSibling.innerHTML;
            remove_one_item_from_storage(item);
            remove_target.parentNode.remove();
        };
    }


//// CLEAR ALL //////////////////////

    // button_clear_storage.addEventListener("click", function(){
    //     clear_storage( TODO_LS_VALUE );
    //     // clear_list();
    //     clear_list();
    // });

//// CLEAR ALL //////////////////////



    table.addEventListener("click", function(e){
        if(e.target.innerHTML == "Usuń"){
            remove_element(e.target);
        }
    });
    
    add.addEventListener("click", function(e){
        e.preventDefault();
    })

    add.addEventListener("click", add_item);
    document.addEventListener("DOMContentLoaded", show_list);

})();