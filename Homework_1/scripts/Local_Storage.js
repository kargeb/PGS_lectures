var first = document.querySelector("#first");
var second = document.querySelector("#second");
var third = document.querySelector("#third");

console.log(first);

var f1 = function() {
    console.log("Nacisłeś przycisk first");
}


function f2() {
    console.log("nascisłeś przysick second");
}

first.addEventListener("click", f1);

second.addEventListener("click", f2);

