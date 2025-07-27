const API_BASE_URL = 'http://localhost:3001/api';

// Platform identifier
const PLATFORM = 'web';

// Get all notes from backend
export async function fetchNotesFromAPI() {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`);
    if (!response.ok) {
      throw new Error('Failed to fetch notes from API');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching notes from API:', error);
    throw error;
  }
}

// Send a note to backend
export async function sendNoteToAPI(note) {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: note.id,
        title: note.title,
        thoughts: note.thoughts,
        date: note.date,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send note to API');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending note to API:', error);
    throw error;
  }
}

// Multi-platform sync - local changes sync to backend
export async function syncWithBackend(localNotes) {
  try {
    const response = await fetch(`${API_BASE_URL}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes: localNotes,
        platform: PLATFORM,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync with backend');
    }
    
    const result = await response.json();
    console.log('Multi-platform sync result:', result);
    return result;
  } catch (error) {
    console.error('Error syncing with backend:', error);
    throw error;
  }
}

// Get sync status
export async function getSyncStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/sync/status`);
    if (!response.ok) {
      throw new Error('Failed to get sync status');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting sync status:', error);
    throw error;
  }
} 