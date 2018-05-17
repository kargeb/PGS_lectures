(function(){

    var button_clear_list = document.querySelector("#button_clear_list");
    var third = document.querySelector("#third");
    var fourth = document.querySelector("#fourth");
    var list = document.querySelector("#list");
    var add = document.querySelector("input[type='submit']");
    var input = document.querySelector("input[type='text']");
    
    console.log(add);
    console.log(input);

    function clear_storage() {
        localStorage.clear();
    }
    
    function show_list() {
        console.log("nascisłeś przysick Show list");
        console.log(localStorage);
        // console.log(localStorage.length);
        for(var czosz in localStorage){
            if(czosz == "length") {
                break;
            }
            console.log("klucz: " + czosz + ", wartoszcz: " + localStorage[czosz]);
            fill_list(localStorage[czosz]);
        }
    }

    function add_item(){
        console.log("jestem w add item");
        console.log("to jeee z inputa - " + input.value); 
        localStorage.setItem(input.value, " ");
        input.value = "";
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
        console.log(list.firstElementChild);
        while(list.firstElementChild){
            list.removeChild(list.firstElementChild);
        }
    }

    function remove_item_from_storage(one_item){
        localStorage.removeItem(one_item);
    }

    button_clear_list.addEventListener("click", clear_list);

    third.addEventListener("click", show_list);

    fourth.addEventListener("click", clear_storage);
    
    list.addEventListener("click", function(e){
        console.log(e.target.innerHTML);
        if(e.target.innerHTML == "remove"){
            console.log("To je Remove !!!");
            console.log(this);
            console.log(e.target.previousSibling.innerHTML);
            for( var key in localStorage) {
                if(localStorage[key] == e.target.previousSibling.innerHTML) {
                    localStorage.removeItem(key);
                }
            }
          //  console.log(e.target.parentNode);
            e.target.parentNode.remove();
        }
    });
    
    add.addEventListener("click", function(e){
        e.preventDefault();
    })
    add.addEventListener("click", add_item);

})();