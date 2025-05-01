// 🚀 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjXAc0n4Gh8OereVnXLTsywrOPQGSB08U",
    authDomain: "ridetracker-5bace.firebaseapp.com",
    databaseURL: "https://ridetracker-5bace-default-rtdb.firebaseio.com",
    projectId: "ridetracker-5bace",
    storageBucket: "ridetracker-5bace.firebasestorage.app",
    messagingSenderId: "903250961017",
    appId: "1:903250961017:web:7af86b799df770e5152aa8",
    measurementId: "G-X6CGLDGYEZ"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // 🔐 SIGNUP
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const uid = userCredential.user.uid;
          return firebase.database().ref("users/" + uid).set({
            firstName,
            lastName,
            email
          });
        })
        .then(() => {
          alert("Signup successful!");
          window.location.href = "index.html";
        })
        .catch(error => {
          alert(error.message);
        });
    });
  }
  
  // 🔐 LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
  
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          const uid = userCredential.user.uid;
          return firebase.database().ref("users/" + uid).once("value");
        })
        .then(snapshot => {
          const user = snapshot.val();
          const initials = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
          localStorage.setItem("userInitials", initials);
          localStorage.setItem("firstName", user.firstName);
          window.location.href = "index.html";
        })
        .catch(error => {
          alert(error.message);
        });
    });
  }
  
  
  // 🔓 LOGOUT
  function logout() {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem("userInitials");
        window.location.href = "login.html";
      })
      .catch(error => {
        alert("Logout failed: " + error.message);
      });
  }

 
  
  