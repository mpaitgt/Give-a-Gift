var btnBox = $('#btn-box');
var gifBox = $('#gif-box');
var topics = ['arrested development', 'the office', 'lost', 'the wire', 'the good place', 'twin peaks', 'the leftovers', 'parks and recreation', 'game of thrones'];
var search = $('#search-btn');
var limit = 10;



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
        newBtn.addClass('gif-btn col-lg-8 col-md-4 col-sm-4 col-sm-4');
        newBtn.attr('data-name', topics[i]);
        newBtn.text(topics[i]);
        btnBox.prepend(newBtn);
    }
}

function displayGIF() {         // display gif function, includes ajax call
    var btnTopic = $(this).attr('data-name');
    var APIkey = 'MVCunlgGr8xkVSFtMCzMpFYtpSwG5C17';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIkey + '&q=' + btnTopic +'&limit=' + limit;

    $.ajax({     // ajax call
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        
        console.log(response);
        for (var i = 0; i < defineLimit(); i++) {       // displays the gif on the page

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

function defineLimit() {
    var limitCount = $('#limit-input').val();

    if (limitCount === '') {
        limit = 10;
        return limit;

    } else if (limitCount >= 1) {
        limit = limitCount;
        return limit;
    }
}

console.log(defineLimit());