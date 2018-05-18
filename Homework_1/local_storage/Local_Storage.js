(function(){

    var button_clear_list = document.querySelector("#button_clear_list");
    var button_show_list = document.querySelector("#button_show_list");
    var button_clear_storage = document.querySelector("#button_clear_storage");
    var list = document.querySelector("#list");
    var add = document.querySelector("input[type='submit']");
    var input = document.querySelector("input[type='text']");

    function clear_storage() {
        localStorage.clear();
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
        localStorage.setItem(input.value, "todo");
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

        if(confirm("Napewno chcesz usunąć to zadanie?")){
            localStorage.removeItem(remove_target.previousSibling.innerHTML);
            remove_target.parentNode.remove();
        };
    }

    button_clear_list.addEventListener("click", clear_list);
    button_show_list.addEventListener("click", show_list);
    button_clear_storage.addEventListener("click", clear_storage);
    
    list.addEventListener("click", function(e){
        if(e.target.innerHTML == "remove"){
            remove_item_from_storage(e.target);
        }
    });
    
    add.addEventListener("click", function(e){
        e.preventDefault();
    })
    add.addEventListener("click", add_item);

    document.addEventListener("DOMContentLoaded", show_list);

})();