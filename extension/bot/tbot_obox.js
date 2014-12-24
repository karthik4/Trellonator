// The omnibox javascript

function tokenizeCommand( command ) {
    // Split on spaces
    var tokenArray = command.split( " " );
    var args = new Array();
    var opts = new Array();

    // The first token is the command

    var com = tokenArray[ 0 ];

    // The rest are either arguments or options
    for (var i = tokenArray.length - 1; i > 0; i--) {
        if( tokenArray[ i ].indexOf("-") == 0 ) {
            opts.push( tokenArray[ i ] );
        } else {
            args.push( tokenArray[ i ] );
        }
    };

    return {
        'command' : com,
        'args' : args,
        'opts' : opts
    };
}

function commandParser( command ) {
    // The command parser function

    tokens = tokenizeCommand( command );

    if( tokens == null ) {
        throw "is Empty";
    }

    var command = tokens.command;
    var args = tokens.args;
    var opts = tokens.opts;

    var text = "TrelloBot: Command: " + command + " Args: " + args + " Opts: " + opts;

    console.log( text );

    alert( text );

}

chrome.omnibox.onInputEntered.addListener( 
    function( text ) {
        console.log( 'TrelloBot: ' + text );
        
        // We got a command for the TrelloBot, now parse the command
        commandParser( text );

    }
);
