# RideTracker

RideTracker is a lightweight ride-sharing log and fare-tracking web app built for small teams and friend groups to track their shared carpooling expenses and ride history with ease.

Includes login/signup with Firebase authentication  
Admin-only ride management  
Weekly and profile summaries  
Firebase Realtime Database integration  
Fully responsive and deployable to Firebase Hosting

---

## Features

- User Authentication (Signup/Login)
- Add Ride with trip details, fare, car used
- Weekly Summary for all users
- Profile Summary for individual ride totals
- Admin Dashboard to edit/delete rides
- Intelligent fare calculation (Mills vs Motel)
- Filter by person and date in summary
- Firebase Hosting ready

---

## Tech Stack

| Frontend     | Backend / DB       | Hosting         |
|--------------|--------------------|------------------|
| HTML, CSS, JS| Firebase Realtime DB | Firebase Hosting |
| Bootstrap (optional) | Firebase Auth | GitHub CI/CD (optional) |

---

## Setup Instructions

1. Clone the repo
   ```bash
   git clone https://github.com/Rithin447/RideTracker.git
   cd RideTracker
   ```

2. Add your Firebase config  
   Replace the config block in `app.js` with your own Firebase project details.

3. Deploy (Optional)
   ```bash
   firebase init
   firebase deploy
   ```

---

## Admin Access

You can assign admin privileges based on email:
```js
const ADMIN_EMAIL = "admin@ridetracker.com";
```

Only admin can:
- Add members to dropdown
- Edit/delete rides
- Access rideManager.html

---

## Screenshots

_You can upload them in the GitHub repo or add real URLs later_

- Home Page
- Add Ride Form
- Weekly Summary with Filters
- Admin Ride Manager (Edit/Delete)

---

## Future Enhancements (Planned)

- Google Calendar integration
- Email summaries using Cloud Functions
- Mobile PWA version
- PDF/CSV report exports

---

## Contributors

- Rithin Srinivas ([@Rithin447](https://github.com/Rithin447))

---

## Contact

For queries, suggestions, or collaborations:  
rithinsrinivas123@gmail.com

---

## License

feel free to use, improve, and share with credit.
