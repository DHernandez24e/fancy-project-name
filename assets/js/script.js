var formSubmitEl = document.querySelector("#form-submit");
var artistSearchEl = document.querySelector("#artist-search");

var testFunction = function() {
    //Prevent page from reloading
    event.preventDefault();

    //Set search term value to variable
    var artist = artistSearchEl.value;

    //Artist search API set to variable
    var artistSearchApi = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="
    + artist +
    "&api_key=702756dd5f8715a1c44e2754d353c270&format=json"

    //Top tracks of artist searched, API set to variable
    var topTracksApi = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="
     + artist + 
    "&api_key=702756dd5f8715a1c44e2754d353c270&format=json";

    //Search result brings up artist, items in response include picture, bio, and similar artists
    fetch(artistSearchApi).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            //Find another API for image search for the artist
            // console.log(data.artist.image[1]["#text"]);

            //Testting removing <a> from bio string
            var bioString = data.artist.bio.summary;
            //Bio summary is split into an array, separating the anchor tag from the summary.
            var bioArr = bioString.split('<a');
            
            //Artist name implemented to page
            $("#artist-name").text(data.artist.name);
            //Artist image (TBD) implemented to the page
            $("#artist-pic").attr("src", data.artist.image[1]["#text"])
            //First item from bio Array 
            $("#artist-bio").text(bioArr[0]);

            //Adding similar artist to a list
            $("#sim-art-one").text(data.artist.similar.artist[0].name);
            $("#sim-art-two").text(data.artist.similar.artist[1].name);
            $("#sim-art-three").text(data.artist.similar.artist[2].name);
            $("#sim-art-four").text(data.artist.similar.artist[3].name);
            $("#sim-art-five").text(data.artist.similar.artist[4].name);

        })
    });

    //Top tracks search brings up top 40 tracks for each search, determine how many results we should display
    fetch(topTracksApi).then(function (response) {
        response.json().then(function(data) {
            console.log(data);

            // console.log(data.toptracks.track[0].name, data.toptracks.track[1].name)

            //Top 5 Tracks added to list
            $("#top-track-one").text(data.toptracks.track[0].name);
            $("#top-track-two").text(data.toptracks.track[1].name);
            $("#top-track-three").text(data.toptracks.track[2].name);
            $("#top-track-four").text(data.toptracks.track[3].name);
            $("#top-track-five").text(data.toptracks.track[4].name);
        })
    })
    
    $(artistSearchEl).val("");

}



formSubmitEl.addEventListener("submit", testFunction);