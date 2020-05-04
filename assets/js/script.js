var formSubmitEl = document.querySelector("#form-submit");
var artistSearchEl = document.querySelector("#artist-search");
var pastSearchEl = document.querySelector("#past-search");
var similarArtistsEl = document.querySelector("#similar-artists")
var apiKey = "702756dd5f8715a1c44e2754d353c270";
var historyArr = [];
var currentUser;
var heroImg = 0;
showHero();
function showHero() {
    var index;
    var heroImgs = document.getElementsByClassName("hero-img-div");
    for (i = 0; i < heroImgs.length; i++) {
        heroImgs[i].style.display = "none";
    }
    heroImg++;
    if (heroImg > heroImgs.length) {
    heroImg = 1;
    };
    heroImgs[heroImg-1].style.display = "block";
    setTimeout(showHero, 5000);
}
var loginNavBtn = $("#login-nav");

$(window).on("load", function() {
if (localStorage.getItem("currentUser") != "guest") {
loginNavBtn.text("Sign Out");
}
})
var modalLogin = $("#modal-login");
var exitBtnLogin = $(".exit").eq(0);

loginNavBtn.on("click", function() {
if (loginNavBtn.text() == "Login") {
modalLogin.show();
} else {
loginNavBtn.text("Login");
localStorage.removeItem("guestplaylist");
localStorage.removeItem("currentUser");
localStorage.setItem("currentUser", "guest");
}
})

exitBtnLogin.on("click", function() {
modalLogin.hide();
})


var loginBtn = $("#login");
var usernameBoxLogin = $("#username-box-login");
var passwordBoxLogin = $("#password-box-login");
var usernameLogin;
var passwordLogin;
loginBtn.on("click", function(event) {
event.preventDefault();
if (loginNavBtn.text() == "Login") {
usernameLogin = usernameBoxLogin.val();
passwordLogin = passwordBoxLogin.val();
if (localStorage.getItem(usernameLogin.toLowerCase() + "password") == passwordLogin) {
modalLogin.hide();
usernameBoxLogin.val("");
passwordBoxLogin.val("");
loginNavBtn.text("Sign out");
currentUser = usernameLogin.toLowerCase();
localStorage.removeItem("currentUser");
localStorage.setItem("currentUser", usernameLogin.toLowerCase());
if (localStorage.getItem(localStorage.getItem("currentUser") + "playlist") == null) {
localStorage.setItem(localStorage.getItem("currentUser") + "playlist", "");
}
if (localStorage.getItem("guestplaylist") != null) {
localStorage.removeItem("guestplaylist");
localStorage.setItem("guestplaylist", "");
}
} else {
$("#wrong-password").show()
usernameBoxLogin.val("");
passwordBoxLogin.val("");
}
} else {
loginNavBtn.text("Login");
}
})

var createAccount = $('#create-account');
var modalCreate = $("#modal-create");
var exitBtnCreate = $(".exit").eq(1);

createAccount.on("click", function(event) {
event.preventDefault();
modalLogin.hide();
modalCreate.show();

})

exitBtnCreate.on("click", function() {
modalCreate.hide();
})

var createAccountBtnOnCreateModal = $("#create-account-create-modal");
var usernameBoxCreate = $("#username-box-create");
var passwordBoxCreate = $("#password-box-create");
var confirmPasswordBoxCreate = $("#confirm-password-box-create");
var firstname = $("#firstname-create");
var lastname = $("#lastname-create");
var usernameCreate;
var passwordCreate;
var confirmPasswordCreate;
createAccountBtnOnCreateModal.on("click", function(event) {
event.preventDefault();
console.log("hello");
usernameCreate = usernameBoxCreate.val();
passwordCreate = passwordBoxCreate.val();
confirmPasswordCreate = confirmPasswordBoxCreate.val();
console.log(confirmPasswordCreate);
console.log(passwordCreate);
if (localStorage.getItem(usernameCreate.toLowerCase() + "password") != null) {
$("#username-taken").show();
return;
} else {
$("#username-taken").hide();
}
if (confirmPasswordCreate != passwordCreate) {
$("#confirm-password-not-same").show();
confirmPasswordBoxCreate.val("");
return;
} else {
console.log("should hide");
$("#confirm-password-not-same").hide()
}
usernameBoxCreate.val("");
passwordBoxCreate.val("");
confirmPasswordBoxCreate.val("");
firstname.val("");
lastname.val("");
modalCreate.hide();
localStorage.removeItem("currentUser");
localStorage.setItem("currentUser", usernameCreate.toLowerCase());
localStorage.setItem(localStorage.getItem("currentUser") + "password", passwordCreate);
loginNavBtn.text("Sign out");
localStorage.setItem(localStorage.getItem("currentUser") + "playlist", "");
})
//
var artistSearch = function(input) {
    //Prevent page from reloading
    event.preventDefault();

    //Set search term value to variable
    var input = artistSearchEl.value;

    //Correction API call for right artist name in case of mispells
    var nameCorrectionApi = "https://ws.audioscrobbler.com/2.0/?method=artist.getcorrection&artist="
    + input +
    "&api_key="
    + apiKey +
    "&format=json";

    //API Call
    fetch(nameCorrectionApi).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                var artist = data.corrections.correction.artist.name;

                ApiCall(artist);
                pastSearchHandler(artist);
            })
        } else {
            alert("Error:" + response.statusText);
        }
    })
};

//Handles API calls for artist information
var ApiCall = function(artist) {

    //Shows elements on page
    $("#artist-main").removeClass("hide")

    //Artist info API, set to variable
    var artistInfoApi = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="
    + artist +
    "&api_key="
    + apiKey +
    "&format=json"

    //Top tracks of artist API, set to variable
    var topTracksApi = "https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="
     + artist +
    "&api_key="
    + apiKey +
    "&format=json";

    //The AudioDB API, used for images
    var audioDbApi = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artist;

    //Search result brings up artist, items in response include picture, bio, and similar artists
    fetch(artistInfoApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                //Removing <a> from bio string
                var bioString = data.artist.bio.summary;
                //Bio summary is split into an array, separating the anchor tag from the summary.
                var bioArr = bioString.split('<a');
               
                //Artist name implemented to page
                $("#artist-name").text(data.artist.name);
                //First item from bio Array
                $("#artist-bio").text(bioArr[0]);

                //Adding similar artist to a list
                $("#sim-art-one").text(data.artist.similar.artist[0].name);
                $("#sim-art-two").text(data.artist.similar.artist[1].name);
                $("#sim-art-three").text(data.artist.similar.artist[2].name);
                $("#sim-art-four").text(data.artist.similar.artist[3].name);
                $("#sim-art-five").text(data.artist.similar.artist[4].name);

        })}
        else {
            alert("Error:" + response.statusText)
    }
    });

    // Top tracks search brings up top 40 tracks for each search, shortened to 5 tracks
    fetch(topTracksApi).then(function (response) {
        if (response.ok) {
        response.json().then(function(data) {

            //Top 5 Tracks added to list
            $("#top-track-one").text(data.toptracks.track[0].name);
            $("#top-track-two").text(data.toptracks.track[1].name);
            $("#top-track-three").text(data.toptracks.track[2].name);
            $("#top-track-four").text(data.toptracks.track[3].name);
            $("#top-track-five").text(data.toptracks.track[4].name);

        })}
        else {
            alert("Error:" + response.statusText)
        }
    });



    //Calls TheAudioDB API for images
    fetch(audioDbApi).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {

                //If API does not have an image or info on artist, sets a placeholder image.
                if (data.artists === null || data.artists[0].strArtistThumb === null) {
                    $("#artist-pic").attr("src", "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png");
                } else {
                    $("#artist-pic").attr("src", data.artists[0].strArtistThumb);
                }
            // $("#artist-logo").attr("src", data.artists[0].strArtistLogo);
        })}
        else {
            alert("Error:" + response.statusText);
        }
    })

    //Clear search form
    $(artistSearchEl).val("");

}

//Handles past searches
var pastSearchHandler = function(artist) {

    //Create element to store item on page
    var searchItem = $("<td>").text(artist);
    $("<tr>").append(searchItem).appendTo("#past-search");

    //Pushes artist name to array for storage
    historyArr.push(artist);
    
    //Call for localStorage to store array values
    localStorage.setItem("artist", JSON.stringify(historyArr));
};

var callBack = function (event) {

    //Prevent page from reloading
    event.preventDefault();

    //Sets HTML value to variable from clicked element
    var artist = event.target.innerHTML;

    //Sets artist clicked as argument for API function
    ApiCall(artist);
};

//Loads previous searches on page load
var loadSearchHistory = function() {

    //Sets localStorage items to variable
    var searchResults = localStorage.getItem("artist");

    //If no items in localStorage, ends function
    if (!searchResults) {
        return false;
    };

    //Parse localStorage values, sets back to array
    historyArr = JSON.parse(searchResults);

    //Loop creates elements based on array length
    for (var i = 0; i < historyArr.length; i++) {
        var searchItem = $("<td>").text(historyArr[i]);
        $("<tr>").append(searchItem).appendTo("#past-search");
    };
};

//Each button has a corresponding function, I just <p>, as a test to see where the information was going when the button was clicked
var songName;
var localStorageList;
var localStorageListStr
$(document).ready(function() {

    $("#1").click(function(){
        var index = parseInt($(this).attr("id"))
        songName = $(".top-track-list").eq(index - 1).text();
        if (localStorage.getItem("currentUser") == "guest") {
        if (localStorage.getItem("guestplaylist") == null) {
localStorageList = [songName]
localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        } else {
        localStorageListStr = localStorage.getItem("guestplaylist");
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem("guestplaylist")
        localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        }
        } else {
        localStorageListStr = localStorage.getItem(localStorage.getItem("currentUser") + "playlist")
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem(localStorage.getItem("currentUser") + "playlist")
        localStorage.setItem(localStorage.getItem("currentUser") + "playlist", JSON.stringify(localStorageList))
        }
       
      });

    $("#2").click(function(){
        var index = parseInt($(this).attr("id"))
        songName = $(".top-track-list").eq(index - 1).text();
        if (localStorage.getItem("currentUser") == "guest") {
        if (localStorage.getItem("guestplaylist") == null) {
localStorageList = [songName]
localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        } else {
        localStorageListStr = localStorage.getItem("guestplaylist");
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem("guestplaylist")
        localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        }
        } else {
        localStorageListStr = localStorage.getItem(localStorage.getItem("currentUser") + "playlist")
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem(localStorage.getItem("currentUser") + "playlist")
        localStorage.setItem(localStorage.getItem("currentUser") + "playlist", JSON.stringify(localStorageList))
        }

      });

    $("#3").click(function(){
        var index = parseInt($(this).attr("id"))
        songName = $(".top-track-list").eq(index - 1).text();
        if (localStorage.getItem("currentUser") == "guest") {
        if (localStorage.getItem("guestplaylist") == null) {
localStorageList = [songName]
localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        } else {
        localStorageListStr = localStorage.getItem("guestplaylist");
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem("guestplaylist")
        localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        }
        } else {
        localStorageListStr = localStorage.getItem(localStorage.getItem("currentUser") + "playlist")
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem(localStorage.getItem("currentUser") + "playlist")
        localStorage.setItem(localStorage.getItem("currentUser") + "playlist", JSON.stringify(localStorageList))
        }
      });
   
    $("#4").click(function(){
        var index = parseInt($(this).attr("id"))
        songName = $(".top-track-list").eq(index - 1).text();
        if (localStorage.getItem("currentUser") == "guest") {
        if (localStorage.getItem("guestplaylist") == null) {
localStorageList = [songName]
localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        } else {
        localStorageListStr = localStorage.getItem("guestplaylist");
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem("guestplaylist")
        localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        }
        } else {
        localStorageListStr = localStorage.getItem(localStorage.getItem("currentUser") + "playlist")
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem(localStorage.getItem("currentUser") + "playlist")
        localStorage.setItem(localStorage.getItem("currentUser") + "playlist", JSON.stringify(localStorageList))
        }
      });

    $("#5").click(function(){
        var index = parseInt($(this).attr("id"))
        songName = $(".top-track-list").eq(index - 1).text();
        if (localStorage.getItem("currentUser") == "guest") {
        if (localStorage.getItem("guestplaylist") == null) {
localStorageList = [songName]
localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        } else {
        localStorageListStr = localStorage.getItem("guestplaylist");
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem("guestplaylist")
        localStorage.setItem("guestplaylist", JSON.stringify(localStorageList))
        }
        } else {
        localStorageListStr = localStorage.getItem(localStorage.getItem("currentUser") + "playlist")
        if (localStorageListStr == "") {
        localStorageList = [songName]
        } else {
        localStorageList = JSON.parse(localStorageListStr)
        localStorageList.push(songName)
        }
        localStorage.removeItem(localStorage.getItem("currentUser") + "playlist")
        localStorage.setItem(localStorage.getItem("currentUser") + "playlist", JSON.stringify(localStorageList))
        }
      });
  });

//Makes playlist adjustable change top tracks 

$( function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();

});

//saves to local storage

var ar = []
ar = document.getElementById("sortable").getElementsByTagName("li");

for(i = 0; i < ar.length; i++){
  localStorage.setItem("tracks", JSON.stringify(($(ar[i]).text())));
}


formSubmitEl.addEventListener("submit", artistSearch);
pastSearchEl.addEventListener("click", callBack);
similarArtistsEl.addEventListener("click", callBack);

loadSearchHistory();