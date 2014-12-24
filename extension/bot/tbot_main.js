// tbot_main.js

// As of now, just replay the same thing in the input as output.
var divNode = document.getElementById('tbotOp');

document.getElementById('textIp').addEventListener("keydown",function ( e ) {
    if (e.which == 13) {
        var spanNode = document.createElement("span");
        var pNode = document.createElement("p");
        var textNode = document.createTextNode(
            document.getElementById('textIp').value);
        pNode.appendChild( textNode )
        spanNode.appendChild( pNode );
        divNode.appendChild( spanNode );
    };
} );