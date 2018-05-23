class Letters {
    constructor(text) {
        this.text = text;
    }

    show_text() {
        return this.text;
    }


    compute_letters() {

        let user_text = "",
            digits = 0,
            characters = 0,
            spaces =0,
            charts = 0;

        console.log(typeof user_text);
        console.log(typeof digits);

        user_text = this.text;

        charts = user_text.length;

        console.log(charts);

        for( var i=0; i<charts; i++ ){

            if( user_text.charCodeAt(i) >= 65 && user_text.charCodeAt(i) <=90  ) {
                characters++;
            } else if (user_text.charCodeAt(i) >= 97 && user_text.charCodeAt(i) <= 122) {
                characters++;
            } else if( user_text.charCodeAt(i) >= 48 && user_text.charCodeAt(i) <=57 ) {
                digits++;
            } else if( user_text.charCodeAt(i) == 32 ) {
                spaces++;
            }
        }

        console.log("this teskt = " + user_text);
        console.log("tekst ma: " + charts + " znaków")
        console.log("litery: " + characters + ", cyfry: " + digits + ", spacje: " + spaces);

        //  return user_text;
    }


}


console.log("dziala");


var text = prompt("Podaj tekst: ")

console.log( text.length );

console.log(text.charCodeAt(2));

var letter_obj = new Letters(text);

console.log( "Podałeś: " + letter_obj.show_text() );
letter_obj.compute_letters();





// function format(text) {
//     return text.toUpperCase();
// }




// class Person {

//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }

//     sayHello() {
//         return format(`${this.firstName} ${this.lastName}`);
//     }

// }

// class Employee extends Person {

//     constructor(firstName, lastName, position) {
//         super(firstName, lastName);
//         this.position = position;
//     }

//     sayHello() {
//         return `Nazywam się ${super.sayHello()} i pracuję jako ${this.position}.`;
//     }

// }




// let employee1 = new Employee("Jan", "Kowalski", "programista");

// console.log( employee1.sayHello() );