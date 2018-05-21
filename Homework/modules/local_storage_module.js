function save_in_storage(key, value) {
    console.log("jestem w module");
    localStorage.setItem(key, value);
}

function load_from_storage(value) {
    let items = new Set();
    if(localStorage.length) {
        for(let key in localStorage ) {
                if(key == "length") {
                    break;
                } else if ( localStorage.getItem(key) == value) {
                    items.add(key);
                }       
        }
    }
    return items;
}

export { save_in_storage, load_from_storage };
