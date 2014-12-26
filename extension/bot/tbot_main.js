// tbot_main.js

// As of now, just replay the same thing in the input as output.
var divNode = document.getElementById('tbotOp');

document.getElementById('textIp').addEventListener("keydown",function ( e ) {
    if (e.which == 13) {
        var spanNode = document.createElement("span");
        var pNode = document.createElement("p");
        var textNode = document.createTextNode(
            document.getElementById('textIp').value);
<<<<<<< HEAD
=======
        document.getElementById('textIp').value = null;
>>>>>>> db57e6519713e5f2423a504d654104477b843792
        pNode.appendChild( textNode )
        spanNode.appendChild( pNode );
        divNode.appendChild( spanNode );
    };
} );