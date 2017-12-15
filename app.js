// Login
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
            $('#login').hide();
            $('#root').append("<img src='" + result.user.photoURL + "' />")
        });
});

// esta funcion guarda los datos de forma automática
function guardaDatos(user) {
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL
    }
    // firebase.database().ref("telmex").push(usuario);
    firebase.database().ref("telmex/" + user.uid).set(usuario);
}

// escribir en la BD
$('#guardar').click(function () {
    firebase.database().ref("telmex")
        .set({
            nombre: "Bliss",
            edad: "15",
            sexo: "muchisimo"
        });
});

// aquí estoy leyendo de la BD
firebase.database().ref("telmex")
    .on("child_added", function (s) {
        var user = s.val();
        $('#root').append("<img width='100px' src='" + user.foto + "' />");        
    });

// Host : 
// 1: npm install -g firebase-tools
// 2: dentro de tu proyecto: firebase init
// 3. firebase deploy
// 4. firebase open