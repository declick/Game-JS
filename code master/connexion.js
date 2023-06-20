function signIn() {
    gapi.auth2.getAuthInstance().signIn().then(onSignInSuccess);
  }
  function onSignInSuccess(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    
    // Envoie du jeton d'authentification au serveur
    // Utilisez une bibliothèque AJAX ou un autre moyen pour envoyer la requête
    // Assurez-vous d'inclure le jeton d'authentification dans la requête
    // Exemple avec AJAX :
    // $.ajax({
    //   url: '/auth/google',
    //   type: 'POST',
    //   data: { idToken: idToken },
    //   success: function(response) {
    //     // Traitement de la réponse du serveur
    //   }
    // });
  }
    