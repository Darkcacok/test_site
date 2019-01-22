window.onload = function () {
    document.querySelector('#signup').onclick = function () {
        var obj = {};
        var elements = document.querySelector('#createuser').querySelectorAll('input');

        for (var i = 0; i < elements.length; ++i) {
            var name = elements[i].name;
            var value = elements[i].value;

            if (elements[i].type == "radio" && elements[i].checked) {
                obj[name] = value;
            }
            else if (elements[i].type != "radio")
                obj[name] = value;

        }

        ajaxPOST("logic/reg.php", JSON.stringify(obj), createUser);
    }


    function ajaxPOST(url, data, callback) {

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200)
                callback(xhttp);
        }

        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }

    function createUser(xhttp) {
        alert(xhttp.responseText);
    }
}