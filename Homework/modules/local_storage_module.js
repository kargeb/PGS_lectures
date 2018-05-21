function save_in_storage(key, value) {
    localStorage.setItem(key, value);
}

function load_from_storage(value) {
    let items = new Map();
    if(localStorage.length) {
        for(let key in localStorage ) {
                if(key == "length") {
                    break;
                } else if ( localStorage.getItem(key) == value) {
                    items.set(key);
                }       
        }
    }
    return items;
}

function remove_one_item_from_storage(item) {
    localStorage.removeItem(item);
}

function clear_storage(value) {
    if(localStorage.length) {
        for(let key in localStorage ) {
                if(key == "length") {
                    break;
                } else if ( localStorage.getItem(key) == value) {
                    localStorage.removeItem(key);
                }       
        }
    }
}

export { save_in_storage, 
        load_from_storage, 
        clear_storage, 
        remove_one_item_from_storage };
