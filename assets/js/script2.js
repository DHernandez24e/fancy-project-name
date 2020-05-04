$(window).on("load", function() {
    debugger;
    if (localStorage.getItem(localStorage.getItem("currentUser") + "playlist") == "") {
        return;
    } else {
        var newSong;
        songsToAddList = JSON.parse(localStorage.getItem(localStorage.getItem("currentUser") + "playlist"));
        if (songsToAddList == null || songsToAddList.length == 0) {
            return;
        }
        for (var i = 0; i < songsToAddList.length; i++) {
            newSong = $("<li>")
            .addClass("playlist-song")
            .text(songsToAddList[i]);
            $("#playlist").sortable().append(newSong);
        }
        
        // $("#playlist").disableSelection();
    }
})
