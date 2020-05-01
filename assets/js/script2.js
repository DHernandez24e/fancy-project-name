$(window).on("load", function() {
    if (localStorage.getItem("songsToAdd") == null) {
        return;
    } else {
        var newSong;
        songsToAddList = JSON.parse(localStorage.getItem("songsToAdd"));
        for (var i = 0; i < songsToAddList.length; i++) {
            newSong = $("<li>")
            .addClass("playlist-song")
            .text(songsToAddList[i]);
            $("#playlist").append(newSong);
        }
    }
})