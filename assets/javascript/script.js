var btnBox = $('#btn-box');
var gifBox = $('#gif-box');
var topics = ['arrested development', 'the office', 'lost', 'the wire', 'the good place', 'twin peaks', 'the leftovers', 'parks and recreation', 'game of thrones'];
var search = $('#search-btn');



window.onload = function() {    // event listeners
    updateButtons();

    search.on('click', function() {     // search button
        var searchItem = $('#search-input').val();

        if (searchItem === '') {
            return;
        } else if (!topics.includes(searchItem)) {
            topics.push(searchItem);
            updateButtons();
            $('#search-input').val('');
        }   
    });

    $(document).on('click', '.gif-btn', displayGIF);      // gif generator buttons
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

function displayGIF() {         // display gif function, includes ajax call
    var btnTopic = $(this).attr('data-name');
    var APIkey = 'MVCunlgGr8xkVSFtMCzMpFYtpSwG5C17';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIkey + '&q=' + btnTopic +'&limit=20';

    $.ajax({     // ajax call
        url: queryURL,
        method: 'GET'
    }).then(function(response) {

        console.log(response);
        for (var i = 0; i < 10; i++) {       // displays the gif on the page

            var newDiv = $('<div>');
            newDiv.addClass('gif-holder');
            var gifImage = response.data[i].images.fixed_height.url;
            var newGif = $('<img>');
            newGif.attr('src', gifImage);

            var newP = $('<p>');
            newP.text(response.data[i].rating);

            newDiv.append(newGif, newP);
            gifBox.prepend(newDiv);
        }
    });
}