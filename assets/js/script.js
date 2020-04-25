var formSubmitEl = document.querySelector("#form-submit");
var artistSearchEl = document.querySelector("#artist-search");

var testFunction = function() {
    //Prevent page from reloading
    event.preventDefault();

    //Set search term value to variable
    var artist = artistSearchEl.value;

    //Artist search API set to variable
    var artistSearchApi = "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="
     + artist + 
    "&api_key=702756dd5f8715a1c44e2754d353c270&format=json";

    //Top tracks of artist searched, API set to variable
    var topTracksApi = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="
     + artist + 
    "&api_key=702756dd5f8715a1c44e2754d353c270&format=json";

    //Top search result brings up artist searched for, other search results are closest to search term
    fetch(artistSearchApi).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            //First item in artist array is the exact match for search result
            console.log(data.results.artistmatches.artist[0])
        })
    })

    //Top tracks search brings up top 40 tracks for each search, determine how many results we should display
    fetch(topTracksApi).then(function (response) {
        response.json().then(function(data) {
            console.log(data);
            console.log(data.toptracks.track)
        })
    })
    


}


formSubmitEl.addEventListener("submit", testFunction);