window.onload = function () {

    document.querySelector('#load').onclick = function () {
        var elements = document.querySelector('.load_post').querySelectorAll('input');

        var formData = new FormData();
        formData.append("picture", elements[0].files[0]);
        formData.append("title", elements[1].value);

        var description = document.querySelector('.load_post').querySelectorAll('textarea');
        formData.append("description", description[0].value);

        ajaxPOST("logic/createpost.php", formData);
    }


    function ajaxPOST(url, data) {

        var xhttp = new XMLHttpRequest();

        xhttp.upload.onprogress = function (event) {
            console.log(event.loaded + ' / ' + event.total);
        }

        xhttp.onload = xhttp.onerror = function () {
            if (this.status == 200) {
                alert(xhttp.responseText);
                console.log("succes");
            }
            else {
                console.log("error" + this.status);
            }
        }

        xhttp.open("POST", url, true);
        xhttp.send(data);
    }
}