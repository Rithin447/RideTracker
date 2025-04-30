

window.onload = function () {
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
  const db = firebase.database();

  const rideForm = document.getElementById('rideForm');
  const nameSelect = document.getElementById('name');

  // Load people into dropdown
  db.ref('people').on('value', (snapshot) => {
    nameSelect.innerHTML = '<option value="">--Select Person--</option>';
    snapshot.forEach((child) => {
      const person = child.val();
      const option = document.createElement('option');
      option.value = person;
      option.textContent = person;
      nameSelect.appendChild(option);
    });
  });

  // Add new person
  window.addPerson = function () {
    const newPerson = document.getElementById('newPerson').value.trim();
    if (newPerson) {
      db.ref('people').push(newPerson);
      document.getElementById('newPerson').value = '';
      alert(`${newPerson} added successfully!`);
    }
  };

  rideForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const tripType = document.getElementById('tripType').value;
    const carName = document.getElementById('carName').value;


    let fare = 0;
    if (location === "Mills") {
      fare = tripType === "One-way" ? 4 : 8;
    } else if (location === "Motel") {
      if (tripType === "Round-trip") {
        fare = 5;
      } else if (location === "Riverside") {
        if (tripType === "Round-trip") {
          fare = 8;
        } else {
          alert("Motel only supports Round-trip rides.");
          return;
        }
      }
    }

    const newRideRef = db.ref("rides").push();
    newRideRef.set({ name, date, location, tripType, fare, carName });

    document.getElementById('result').innerHTML = `
      <strong>Ride Submitted!</strong><br>
      Name: ${name}<br>
      Date: ${date}<br>
      Location: ${location}<br>
      Trip Type: ${tripType}<br>
      Fare: $${fare}
    `;

    rideForm.reset();
  });
};
