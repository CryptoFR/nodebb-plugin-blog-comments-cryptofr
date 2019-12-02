// url Async requesting function
function httpGetAsync(theUrl, callback){
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext){
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    top_10_gifs = response_objects["results"];

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

    document.querySelector("#gifs-list").innerHtml="";
    for (let img of top_10_gifs){
        var element = document.createElement("img");
        element.src=img["media"][0]["nanogif"]["url"];
        element.classList.add("gifs-result");
        document.querySelector("#gifs-list").appendChild(element)
    }

    return;

}


// function to call the trending and category endpoints
function grab_data(search_term){
    // set the apikey and limit
    var apikey = "D68S16GQGKWB";
    var lmt = 8;

    // test search term
    // var search_term = "excited";

    // using default locale of en_US
    var search_url = "https://api.tenor.com/v1/search?tag=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search);

    // data will be loaded by each call's callback
    return;
}

export function gifBoxInit(){
    for (let gifButton of document.querySelectorAll('.special-action.gif')) {
        gifButton.addEventListener('click', function(event){
            document.querySelector(".gifs-box").style.display="block";
        });
    }

    document.querySelector(".gif-search").addEventListener("onkeypress", function(event){

    });
}
