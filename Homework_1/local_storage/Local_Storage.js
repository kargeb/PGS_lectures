(function(){

    var first = document.querySelector("#first");
    var second = document.querySelector("#second");
    var third = document.querySelector("#third");
    var output1 = document.querySelector("#output1");
    var list = document.querySelector("#list");
    
    console.log(first);
    console.log(output1);

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
    }


    first.addEventListener("click", f1);
    
    second.addEventListener("click", f2);

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
    
})();