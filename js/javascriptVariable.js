function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    dd < 10 && (dd = '0' + dd);
    mm < 10 && (mm = '0' + mm);
    return yyyy + '-' + mm + '-' + dd;
}