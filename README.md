# PhotoFolio

PhotoFolio is a React-based web application for managing photo albums. Users can create albums, add photos, and view them in a carousel format. The app uses Firebase Firestore for data storage and React Toastify for notifications.

## Features

- Create, view, and delete photo albums.
- Add, edit, and delete photos within albums.
- Responsive design with a user-friendly interface.
- Real-time updates using Firebase Firestore.

## Technologies Used

- React
- Firebase Firestore
- React Toastify
- CSS Modules

## Setup and Configuration

### Prerequisites

- Node.js and npm installed on your system.
- Firebase account.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/suranjit231/photo-folio-react-firebase.git
   cd photofoilo
2. Install dependencies:
   npm install
3. Create a .env file in the root directory with your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```
4. Start the development server:
   npm start
