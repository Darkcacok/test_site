window.onload = function () {

    ajaxGET("logic/getusers.php", getUsers);

    document.querySelector('#create').onclick = function () {
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


    function toJson(name, value) {
        var obj = {};

        for (var i = 0; i < name.length; ++i) {
                obj[name[i]] = value[i];
        }
        return JSON.stringify(obj);
    }

    function updateUser(xhttp){
        var response = JSON.parse(xhttp.responseText);

        var value = [];
        value.push(response.id);
        var text = toJson(["id"], value);
        ajaxPOST("logic/getuser.php", text, getUser);

        alert(response.text);
    }


    function onRowDblClcik(event) {
        this.ondblclick = null;
        this.className = 'editable';
        for (var i = 0; i < 2; i++) {
            var cell = this.cells[i];
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.value = cell.firstChild.data;
            cell.replaceChild(input, cell.firstChild);
        }
        var gender = this.cells[2];
        var garray = ["Мужской", "Женский"];
        var gvalue = ["M", "F"];

        var rank = this.cells[3];
        var rarray = ["Администратор", "Пользователь"];
        var rvalue = ["A", "U"];

        var selectg = document.createElement('select');
        var selectr = document.createElement('select');


        var option = document.createElement("option");

        switch (gender.firstChild.data) {
            case "Мужской": {
                var option1 = document.createElement("option");
                var option2 = document.createElement("option");

                option1.setAttribute("value", gvalue[0]);
                option1.text = garray[0];
                selectg.appendChild(option1);

                option2.setAttribute("value", gvalue[1]);
                option2.text = garray[1];
                selectg.appendChild(option2);
                break;
            }
            case "Женский": {
                var option1 = document.createElement("option");
                var option2 = document.createElement("option");

                option1.setAttribute("value", gvalue[1]);
                option1.text = garray[1];
                selectg.appendChild(option1);

                option2.setAttribute("value", gvalue[0]);
                option2.text = garray[0];
                selectg.appendChild(option2);
                break;
            }
        }
        gender.replaceChild(selectg, gender.firstChild);

        switch (rank.firstChild.data) {
            case "Администратор": {
                var option1 = document.createElement("option");
                var option2 = document.createElement("option");

                option1.setAttribute("value", rvalue[0]);
                option1.text = rarray[0];
                selectr.appendChild(option1);

                option2.setAttribute("value", rvalue[1]);
                option2.text = rarray[1];
                selectr.appendChild(option2);
                break;
            }
            case "Пользователь": {
                var option1 = document.createElement("option");
                var option2 = document.createElement("option");

                option1.setAttribute("value", rvalue[1]);
                option1.text = rarray[1];
                selectr.appendChild(option1);

                option2.setAttribute("value", rvalue[0]);
                option2.text = rarray[0];
                selectr.appendChild(option2);
                break;
            }
        }
        rank.replaceChild(selectr, rank.firstChild);


        var savebtn = document.createElement("button");
        savebtn.innerHTML = "Сохранить";

        savebtn.addEventListener("click", function () {
            var row = document.getElementById(this.parentElement.parentElement.id);
            row.deleteCell(5);
            row.deleteCell(4);

            var name = ["id", "login", "email", "gender", "rank"];
            var value = [];
            value.push(row.id);

            for (var i = 0; i < row.cells.length; ++i) {
                value.push(row.cells[i].firstChild.value);
            }
            var objJson = toJson(name, value);

            ajaxPOST("logic/updateuser.php", objJson, updateUser);
            
            row.ondblclick = onRowDblClcik;
        });

        var savecell = this.insertCell(4);
        savecell.appendChild(savebtn);

        var cancelbtn = document.createElement("button");
        cancelbtn.innerHTML = "Отмена";

        cancelbtn.addEventListener("click", function () {
            var row = document.getElementById(this.parentElement.parentElement.id);
            row.deleteCell(5);
            row.deleteCell(4);

            var text = toJson(["id"], row.id);

            ajaxPOST("logic/getuser.php", text, getUser);

            /*for (var i = 0; i < row.cells.length - 2; ++i) {
                row.cells[i].innerHTML = row.cells[i].firstChild.value;
            }

            for (var i = 2; i < row.cells.length; ++i) {
                row.cells[i].innerHTML = row.cells[i].firstChild.firstChild.label;
            }*/
            row.ondblclick = onRowDblClcik;
        });

        var cancelcell = this.insertCell(5);
        cancelcell.appendChild(cancelbtn);

    }

    function createUsersTable(users) {
        var table = document.createElement("TABLE");
        table.className = "users"

        for (var i = 0; i < users.length; ++i) {
            var row = table.insertRow(i);
            row.ondblclick = onRowDblClcik;
            row.id = users[i].id;

            var cel = row.insertCell(0);
            var cel1 = row.insertCell(1);
            var cel2 = row.insertCell(2);
            var cel3 = row.insertCell(3);

            cel.innerHTML = users[i].username;
            cel1.innerHTML = users[i].email;

            if (users[i].gender == "M")
                cel2.innerHTML = "Мужской";
            else
                cel2.innerHTML = "Женский";

            if (users[i].rank == "U")
                cel3.innerHTML = "Пользователь";
            else
                cel3.innerHTML = "Администратор";
        }
        document.body.appendChild(table);
    }


    function getUsers(xhttp) {
        var response = JSON.parse(xhttp.responseText);
        createUsersTable(response);
        /*console.log(response);
        for (var i = 0; i < response.length; ++i) {
 
            var div = document.createElement('div'); 
            div.className = response[i].id;
            str = response[i].username + "  " + response[i].email + "  " + response[i].gender + "  " + response[i].rank;
            div.innerHTML = str;
            document.body.appendChild(div);
        }*/
    }

    function getUser(xhttp){
        var response = JSON.parse(xhttp.responseText);
        var id = parseInt(response[0].id) -1;
        var row = document.getElementsByClassName("users")[0].rows[id];

        row.cells[0].innerHTML = response[0].username;
        row.cells[1].innerHTML = response[0].email;

        if(response[0].gender == 'M')
            row.cells[2].innerHTML = 'Мужской';
        else
            row.cells[2].innerHTML = 'Женский';
        
        if(response[0].rank == 'U')
            row.cells[3].innerHTML = 'Пользователь';
        else
            row.cells[3].innerHTML = 'Администратор';
    }

    function createUser(xhttp) {
        alert(xhttp.responseText);
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


    function ajaxGET(url, callback) {

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp);
            }
        }

        xhttp.open("GET", url);
        xhttp.send();
    }
}