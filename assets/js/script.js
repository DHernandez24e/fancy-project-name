var formSubmitEl = document.querySelector("#form-submit");
var artistSearchEl = document.querySelector("#artist-search");

var testFunction = function() {
    //Prevent page from reloading
    event.preventDefault();

    //Clear forms?
    $("#sim-art-ul").clear("");

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
                //console.log(data.artist.image[1]["#text"]);
            
            var similarArtists = data.artist.similar.artist;

            //Testting removing <a> from bio string
            var bioString = data.artist.bio.summary;
            //Bio summary is split into an array, separating the anchor tag from the summary.
            var bioArr = bioString.split('<a');
            
            //Artist name implemented to page
            $("#artist-name").text(data.artist.name);
                // $("#artist-pic").attr("src", data.artist.image[1]["#text"])
            $("#artist-bio").text(bioArr[0]);

            for (var i = 0; i < similarArtists.length; i++) {
                var simArt = data.artist.similar.artist[i].name;

                $("<li>").text(simArt).appendTo("#sim-art-ul");

                //$("#sim-art-ul")
            }
        })
    });

    //Top tracks search brings up top 40 tracks for each search, determine how many results we should display
    fetch(topTracksApi).then(function (response) {
        response.json().then(function(data) {
            // console.log(data);

            // console.log(data.toptracks.track[0].name, data.toptracks.track[1].name)
        })
    })
    
    $(artistSearchEl).val("");

}


formSubmitEl.addEventListener("submit", testFunction);