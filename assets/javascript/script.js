var btnBox = $('#btn-box');
var gifBox = $('#gif-box');
var topics = ['tv shows', 'movies', 'bands', 'books', 'food'];
var search = $('#search-btn');

window.onload = function() {
    updateButtons();

    search.on('click', function() {     // search button
        var searchItem = $('#search-input').val();
        topics.push(searchItem);
        updateButtons();
    });

    $(document).on('click', '.gif-btn', displayGIF);      // gif-created buttons
}


function updateButtons() {      // displays the button on the page
    btnBox.empty();

    for (var i = 0; i < topics.length; i++) {
        var newBtn = $('<button>');
        newBtn.addClass('gif-btn');
        newBtn.attr('data-name', topics[i]);
        newBtn.text(topics[i]);
        btnBox.append(newBtn);
    }
}


function displayGIF() {
    var btnTopic = $(this).attr('data-name');
    var APIkey = 'MVCunlgGr8xkVSFtMCzMpFYtpSwG5C17';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIkey + '&q=' + btnTopic;

    $.ajax({     
               // ajax call
        url: queryURL,
        method: 'GET'
    }).then(function(response) {

        console.log(response);
        for (var i = 0; i < 5; i++) {       // displays the gif on the page

            var newDiv = $('<div>');
            newDiv.addClass('gif-holder');
            var gifImage = response.data[i].images.fixed_width.url;
            var newGif = $('<img>');
            newGif.attr('src', gifImage);
            newDiv.append(newGif);
            gifBox.prepend(newDiv);
        }
    });
}
// called functions


// add a button click function 