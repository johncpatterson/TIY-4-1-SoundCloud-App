jQuery(function() {

    $("#submitForm").on("submit", function() {
        event.preventDefault();
        var song = $("#searchBox").val();
        getSong(song);

    })
    $("#button").on("click", function() {
        var song = $("#searchBox").val();
        getSong(song);

    })
    $("body").on("click", '.playButton', function() {
        var id = $(this).data("id");
        console.log(id);
        var songString = `http://api.soundcloud.com/tracks/${id}/stream?client_id=03e4633e2d85874a921380e47cac705d`;
        $("audio").attr("src", songString);
        $("#nowPlaying").text(id);
    })
    $("body").on("click", ".songArtwork", function() {
        var id = $(this).data("id");
        console.log(id);
        var songString = `http://api.soundcloud.com/tracks/${id}/stream?client_id=03e4633e2d85874a921380e47cac705d`;
        $("audio").attr("src", songString);
        $("#nowPlaying").text(id);

    })


    function getSong(query) {

        $("#putStuffHere").html("");
        $.ajax({
            url: `https://api.soundcloud.com/tracks/?q=${query}&client_id=03e4633e2d85874a921380e47cac705d`,
            method: 'GET',
            success: function successHandler(songData) {
                console.log(songData);

                songData.forEach(function(songData) {

                    var streamID = songData.id;
                    console.log(streamID);
                    if (songData.artwork_url === null) {
                        songData.artwork_url = "http://www.bensound.com/bensound-img/happyrock.jpg";

                    }

                    $("#putStuffHere").append(`
                        <div class="row">
                                <div class="col-md-3"><img src="${songData.artwork_url}" data-id="${streamID}" class="songArtwork img-responsive"></div>
                                <div class="song_title col-md-3">${songData.title}</div>
                                <div class="col-md-2"><button data-id="${streamID}" class="playButton btn btn-lg btn-warning">Play song</button></div>
                                <div class="waveform_artwork col-md-4"><img src="${songData.waveform_url}" class="waveform img-responsive"></div>
                                
                       </div>`)

                })
            },
        });
    }










    // end of jQuery function tag:
});
