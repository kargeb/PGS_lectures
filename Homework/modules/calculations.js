function average_temp(data) {

    let temp = 0;
    for(let i=0; i<data.list.length; i++) {
        temp += data.list[i].main.temp
    }
    temp = temp/data.list.length;
    return temp;
}

export { average_temp };