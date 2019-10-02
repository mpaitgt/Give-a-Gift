var btnBox = $('#btn-box');
var gifBox = $('#gif-box');
var faveBox = $('#fave-box');
var topics = ['twin peaks', 'the leftovers', 'parks and recreation', 'game of thrones'];
var search = $('#search-btn');
var clear = $('#clear-btn');
var faveClear = $('#fave-clear');
var limit = 3;
var localIndex = localStorage.getItem('faveLength');
var favorites = [];


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

    $(document).on('click', '.gif-image', addFavorite);     // gif button which adds to favorites list
    $(document).on('click', '.gif-holder', function() {
            $(this).addClass('selected-animation');
            var added = $('<p>').text('Added!');
            added.addClass('added');
            $(this).append(added);
    });

    faveClear.on('click', clearFavorites);

    $(document).on('click', '.gif-btn', displayGIF);      // gif generator buttons

    $('#clear-btn').on('click', clearGIFs);     // clear gifs button

    $('#btn-clear').on('click', clearBTNs);     // clear buttons button

    $('#btn-fave').on('click', function() {     // favorites button
        clearGIFs();
        faveBox.empty();
        faveBox.css('display', 'block');
        faveClear.css('display', 'block');

        for (var x = 1; x <= localStorage.getItem('faveLength'); x++) {
            var faveImg = $('<img>');
            faveImg.addClass('gif-holder');
            faveImg.attr('src', localStorage.getItem('faveGif' + x));
            faveBox.prepend(faveImg);
        }
    });
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
    
    defineLimit();
    faveBox.css('display', 'none');

    var btnTopic = $(this).attr('data-name');
    var APIkey = 'MVCunlgGr8xkVSFtMCzMpFYtpSwG5C17';
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + APIkey + '&q=' + btnTopic +'&limit=' + limit;

    $.ajax({     // ajax call
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        
        console.log(response);

        for (var i = 0; i < limit; i++) {       // displays the gif on the page

            var newDiv = $('<div>');
            newDiv.addClass('gif-holder');
            var gifImage = response.data[i].images.fixed_height.url;
            var newGif = $('<img>');
            newGif.addClass('gif-image');
            newGif.attr('src', gifImage);

            var newP = $('<p>');
            newP.addClass('rated');
            newP.text('Rated: ' + response.data[i].rating);

            newDiv.append(newGif, newP);
            gifBox.prepend(newDiv);
        }
    });
}

function defineLimit() {        // defines the limit, defaults at 10
    var limitCount = $('#limit-input').val();

    if (limitCount === '') {
        limit = 3;
        return limit;

    } else if (limitCount >= 1) {
        limit = limitCount;
        return limit;
    }
}

function addFavorite() {        // function adds a selected gif to the favorites section
    var newFave = $(this).attr('src');
    localIndex++;

    if (favorites.includes(newFave)) {
        return; 
    } else {
        favorites.push(newFave);
    }

    // stores image urls in local storage
    localStorage.setItem('faveLength', localIndex);
    localStorage.setItem('faveGif' + localIndex, newFave);

}

function clearGIFs() {      // clears the gifbox, called on the clear gifs button
    gifBox.empty();
}

function clearBTNs() {
    topics = [];
    updateButtons();
    $('#btn-box').animate({'display': 'none'});    
}

function clearFavorites() {
    var sure = confirm('Are you sure you want to delete your favorites?');

    if (!sure) {
        return;
    } else {
        localStorage.clear();
        faveBox.empty();
    }
}


