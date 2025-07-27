// Setup Instructions

1. npm install
2. npm run build
3. npm run preview

For backend
cd notes-api -> npm run dev

// Tech stack

1. Frontend using react + Tailwind
2. Offline Storage: i am using library named idb (https://www.npmjs.com/package/idb)
3. For backend, Express.js (Node.js)

// Architecture overview:
Create UI -> Implemented CRUD functionality -> Stored notes in indexedDB -> Run in offline mode ->
Build Backend -> Now When device is back online -> Sync with backend

// Offline Strategy

1. I used indexedDB (idb library) to store notes locally in the browser
2. User can Create, edit or delete notes even without internet
3. When the app detects that the device is back online, it automatically syncs the local notes with the backend.

// Known Trade-offs & Future Improvements

1. Currently no user authentication
2. Also simple UI
