// The omnibox javascript

chrome.omnibox.onInputEntered.addListener( 
    function( text ) {
        console.log( 'TrelloBot: ' + text );
        alert( "Keyword fired!" );
    }
);
