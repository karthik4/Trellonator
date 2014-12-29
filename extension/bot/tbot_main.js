// tbot_main.js

// As of now, just replay the same thing in the input as output.
var divNode = document.getElementById('tbotOp');


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


function checkCookie (name) {

    var ck = document.cookie;

    // Check if tbot exists in the series of cookies
    var begin = ck.indexOf( name + '=' );
    
    if( begin == -1 ) {
        // doesn't exist...
        return null;
    }

    // Exists... so, try extracting the value
    var end = ck.indexOf( ';', begin );

    if( end == -1 ) {
        end = ck.length;
    }

    return ck.substring( begin, end).split( '=' )[1];
}


function doAuthProc( key ) {
    var token = null;

    var xhr = new XMLHttpRequest();

    xhr.open('GET','https://trello.com/1/authorize?callback_method=postMessage&return_url=origin&scope=read&expiration=1hour&name=TrelloBot&key=' + key, false );

    xhr.send(null);

    var resp = xhr.responseText;
    console.log( resp );

    var signature_begin = resp.substring('<form');
    var signature_end = resp.substring('/form>');
    
    var newFrame = document.createElement("iframe");
    document.body.appendChild( newFrame );
    newFrame.contentWindow.document.open( );
    newFrame.contentWindow.document.write( resp );
    newFrame.contentWindow.document.close();


    console.log( signature );

    resp = signature;

    // Response is a html.
    return resp;
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

    var key = '31bdd2e5ee48bb361fceef935c5698af';

    console.log( text );

    // Simple FSMish construct

    switch( command ) {
        case 'replay':
            text = 'TrelloBot says: ';
            text += args;

            alert( text );
            var spanNode = document.createElement("span");
            var pNode = document.createElement("p");
            var textNode = document.createTextNode(
                'TrelloBot: ' + command );
            document.getElementById('textIp').value = null;
            pNode.appendChild( textNode );
            spanNode.appendChild( pNode );
            divNode.appendChild( spanNode );
            break;
        case 'board':
            // various board commands... default being navigate to that board
            switch( opts ) {
                case '-sample':
                default:
                    // Just display the list of boards that are by the user
                    var xhr = new XMLHttpRequest();

                    // check if there is a cookie that contains the OAuth token

                    authToken = null;//checkCookie( 'tbot' );
                    console.log( 'authToken is ' + authToken )
                    alert( authToken );
                    if( authToken == null ) {
                        authToken = doAuthProc( key )
                    } else {
                        // showAllBoards( key, authToken );
                    }
            }
            break;

        default:
            alert('Command ' + command + ' is not implemented yet!');
            break;
    }

}


document.getElementById('textIp').addEventListener("keydown",function ( e ) {
    // Check for the enter key pressed
    if (e.which == 13) {
        var command = document.getElementById('textIp').value;
        commandParser( command );
    }
} );

