(function(){

    var first = document.querySelector("#first");
    var second = document.querySelector("#second");
    var third = document.querySelector("#third");
    var list = document.querySelector("#list");
    var add = document.querySelector("input[type='submit']");
    var input = document.querySelector("input[type='text']");
    
    console.log(first);
    console.log(add);
    console.log(input);

    var f1 = function() {
        console.log("Nacisłeś przycisk first");
        output1.classList.remove("fail");
        output1.classList.add("ok");

        localStorage.setItem("Zwierze", "Pies");
        localStorage.miasto = "Koszalin";
    }
    
    function f2() {
        console.log("nascisłeś przysick second");
        output1.classList.remove("ok");
        output1.classList.add("fail");

        localStorage.setItem("Rzecz", "Dupa");
    }
    
    function f3() {
        console.log("nascisłeś przysick Third");
        console.log(localStorage);
        // console.log(localStorage.length);
        for(var czosz in localStorage){
            if(czosz == "length") {
                break;
            }
            console.log("klucz: " + czosz + ", wartoszcz: " + localStorage[czosz]);
        }
    }

    function add_item(){
        console.log("jestem w add item");
        console.log("to jeee z inputa - " + input.value); 
        localStorage.setItem(localStorage.length+1, input.value);
        input.value = "";
    }

    function fill_list() {
        let div_task = document.createElement("div");
        let div_remove = document.createElement("div");
        let div_item = document.createElement("div");
        div_task.classList.add("task");
        div_task.innerHTML = "noowo stworony elementr";
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

    first.addEventListener("click", fill_list);
    
    second.addEventListener("click", clear_list);

    third.addEventListener("click", f3);
    
    list.addEventListener("click", function(e){
        console.log(e.target.innerHTML);
        if(e.target.innerHTML == "remove"){
            console.log("To je Remove !!!");
            console.log(this);
            console.log(e.target.parentNode);
            e.target.parentNode.remove();
        }
    });
    
    add.addEventListener("click", function(e){
        e.preventDefault();
    })
    add.addEventListener("click", add_item);

})();