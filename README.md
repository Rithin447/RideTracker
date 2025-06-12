# RideTracker

**RideTracker** is a lightweight web application that helps users track shared rides and automatically split fares based on individual destinations. Built using HTML, CSS, JavaScript, and Firebase, the application is designed for simple fare management within small groups who frequently share rental or personal vehicles.

## Features

- Add and log ride details (date, origin, destination, participants)
- Automatically calculate and split fare among ride participants
- View a summary of rides and fare distribution for each user
- Real-time data updates using Firebase
- Minimalist UI for fast data entry and access

## Technologies Used

- HTML5, CSS3, JavaScript (ES6)
- Firebase Realtime Database
- Firebase Hosting (for deployment)

## File Structure

- `index.html` – Home page with links to other views
- `addRide.html` – Page for entering ride details
- `summary.html` – Dashboard for viewing fare summaries
- `app.js` – Core logic for Firebase interactions and ride management
- `style.css` – Stylesheet for UI layout and design

## How to Run the Project

1. Clone the repository:
   ```
   git clone https://github.com/Rithin447/RideTracker.git
   cd RideTracker
   ```

2. Open `index.html` in a browser or deploy the app using Firebase:
   - Ensure you have a Firebase project set up.
   - Replace Firebase configuration in `app.js` with your own.
   - Deploy:
     ```
     firebase init
     firebase deploy
     ```

## Firebase Configuration

Update the Firebase configuration in `app.js` with your own project credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Future Enhancements

- Add Firebase Authentication to support multi-user access
- Implement ride editing and deletion features
- Introduce advanced filters and date range queries in the summary view
- Add data visualization using Chart.js or similar libraries
- Enable CSV export of ride logs

## Author

Rithin Srinivas  
Master’s in Business Intelligence & Analytics  
California State University, San Bernardino

## License

This project is open-source and available under the MIT License.
