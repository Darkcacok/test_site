window.onload = function () {


    ajaxGET("logic/getposts.php", createPosts);


    function createPosts(xhttp) {
        var posts = JSON.parse(xhttp.responseText)

        for (var i = 0; i < posts.length; ++i)
        {
            var post = document.createElement('div');
            post.className = "post";

            var picture = document.createElement('div');
            picture.className = "picture";
            var newimg = document.createElement('img');
            newimg.setAttribute("src", posts[i].path);
            picture.appendChild(newimg);

            var content = document.createElement('div');
            content.className = "content";
            var H2 = document.createElement('h2');
            var nodeH2 = document.createTextNode(posts[i].title);
            var p = document.createElement('p');
            var nodeP = document.createTextNode(posts[i].text);
            H2.appendChild(nodeH2);
            p.appendChild(nodeP);
            content.appendChild(H2);
            content.appendChild(p);

            post.appendChild(picture);
            post.appendChild(content);

            document.body.appendChild(post);
        }

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