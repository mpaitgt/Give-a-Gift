var btnBox = $('#btn-box');
var topics = ['tv shows', 'movies', 'bands', 'books', 'food'];
var search = $('#search-btn');

window.onload = function() {

    search.on('click', function() {
        var searchItem = $('#search-input').val();
        topics.push(searchItem);
        updateButtons();
    });

    currentBtn.on('click', '.btnOptions', function() {
        var APIkey = 'BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9';
        var queryURL = 'https://api.giphy.com/v1/gifs/trending?api_key=' + APIkey;

        $.ajax({            // ajax call
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
        });
    })
}

function updateButtons() {
    btnBox.empty();
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $('<button>').addClass('col-12');
        //display the current array item text within the button
        newBtn.text(topics[i]);
        //append the button to the btnBox
        btnBox.append(newBtn);
    }
}



// called functions
updateButtons();


// add a button click function 