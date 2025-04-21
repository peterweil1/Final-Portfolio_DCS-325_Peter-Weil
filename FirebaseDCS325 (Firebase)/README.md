# Firebase Todo App Demo

A simple React application demonstrating Firebase Authentication and Firestore Database.

## Features

- User registration and authentication with Firebase Auth
- Todo list management with Firestore
- Real-time data synchronization
- Protected routes for authenticated users

## Setup Instructions

1. **Create a Firebase Project**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup instructions
   - Enable Authentication with Email/Password provider
   - Create a Firestore Database in test mode

2. **Get Firebase Configuration**

   - In your Firebase project, go to Project Settings (gear icon)
   - Scroll down to "Your apps" section and select the web app (or create one)
   - Copy the Firebase configuration object

3. **Update Firebase Configuration**

   - Open `src/firebase.js` in this project
   - Replace the placeholder `firebaseConfig` object with your actual Firebase configuration

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

4. **Install Dependencies**

```bash
npm install
```

5. **Start the Development Server**

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Firestore Rules

You can enhance security with these Firestore rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Deployment

To deploy this application to Firebase Hosting:

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project:

```bash
firebase init
```

4. Build the production version:

```bash
npm run build
```

5. Deploy to Firebase Hosting:

```bash
firebase deploy
```
