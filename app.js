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

firebase.initializeApp(firebaseConfig);

const ADMIN_EMAIL = "testadmin@gmail.com"; // define single admin email

// SIGNUP
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
        window.location.href = "login.html";
      })
      .catch(error => {
        alert(error.message);
      });
  });
}


// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    firebase.auth().signInWithEmailAndPassword(emailInput, password)
      .then(userCredential => {
        const uid = userCredential.user.uid;
        return firebase.database().ref("users/" + uid).once("value");
      })
      .then(snapshot => {
        const user = snapshot.val();
        const initials = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
        const isAdmin = emailInput === ADMIN_EMAIL.toLowerCase(); // Clean comparison

        localStorage.setItem("userInitials", initials);
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");

        if (isAdmin) {
          alert("✅ Logged in as ADMIN");
          window.location.href = "adminPanel.html";
        } else {
          window.location.href = "index.html";
        }
      })
      .catch(error => {
        alert(error.message);
      });
  });
}


// LOGOUT
function logout() {
  firebase.auth().signOut()
    .then(() => {
      localStorage.clear();
      window.location.href = "login.html";
    })
    .catch(error => {
      alert("Logout failed: " + error.message);
    });
}

gtag('event', 'ride_added', {
  location: newRide.location,
  user: newRide.name
});

gtag('event', 'login', {
  method: 'email_password',
  email: user.email
});




function calculateSharedFareAndSaveRide(newRide) {
  const rideRef = firebase.database().ref("rides");

  rideRef.orderByChild("date").equalTo(newRide.date).once("value").then(snapshot => {
    let matchingRides = [];

    snapshot.forEach(child => {
      const ride = child.val();

      const sameLocation = ride.location === newRide.location;
      const sameTrip = ride.tripType === newRide.tripType;
      const sameCar = ride.carTo === newRide.carTo;

      if (sameLocation && sameTrip && sameCar) {
        matchingRides.push(child.key);
      }
    });

    const totalFare = (newRide.location === "Mills" && newRide.tripType === "Round-trip") ? 15 : newRide.fare;
    const peopleCount = matchingRides.length + 1;
    const individualFare = totalFare / peopleCount;

    // Update existing rides
    matchingRides.forEach(rideId => {
      rideRef.child(rideId).update({ fare: individualFare });
    });

    // Save current ride with calculated fare
    firebase.database().ref("rides").push({ ...newRide, fare: individualFare }).then(() => {
      document.getElementById("result").innerText = "✅ Ride added successfully!";
      document.getElementById("rideForm").reset();
    }).catch(err => {
      document.getElementById("result").innerText = "❌ Error: " + err.message;
    });
  });
}
