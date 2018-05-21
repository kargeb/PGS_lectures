function save_in_storage(key, value) {
    console.log("jestem w module");
    localStorage.setItem(key, value);
}

function load_from_storage() {

}

export { save_in_storage };
