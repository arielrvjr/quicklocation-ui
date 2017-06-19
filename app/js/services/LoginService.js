var LoginService = function($rootScope,$firebaseAuth, $location){
	var auth = $firebaseAuth();
	function loginWithProvider(provider) { 
		auth.$signInWithPopup(provider).then(function(result) {
			console.log("Signed in as:", result.uid);
			var token = result.credential.accessToken;
			$rootScope.user = result.user;
			console.log(result);
		}).catch(function(error) {
			console.log("Authentication failed:", error);
		});

	};

	auth.$onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);
			$rootScope.user = firebaseUser;
		} else {
			console.log("Signed out");
			$rootScope.user = null;

		}
		$location.path('/');
	});

	return {
		currentUser: function(){return auth.$getAuth()},
		logout: function(){return auth.$signOut()},
		loginFacebook: function(){return loginWithProvider(new firebase.auth.FacebookAuthProvider());},
		loginGoogle: function(){return loginWithProvider(new firebase.auth.GoogleAuthProvider());},
	};
};

module.exports = LoginService;
