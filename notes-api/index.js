const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database later)
let notes = [];

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Notes API is running!' });
});

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Create a new note
app.post('/api/notes', (req, res) => {
  const { title, thoughts, date, id } = req.body;
  
  if (!title || !thoughts || !date) {
    return res.status(400).json({ 
      error: 'Title, thoughts, and date are required' 
    });
  }
  
  const newNote = {
    id: id || Date.now().toString(),
    title,
    thoughts,
    date,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  notes.push(newNote);
  res.status(201).json(newNote);
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, thoughts, date } = req.body;
  
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    title: title || notes[noteIndex].title,
    thoughts: thoughts || notes[noteIndex].thoughts,
    date: date || notes[noteIndex].date,
    updatedAt: new Date().toISOString()
  };
  
  res.json(notes[noteIndex]);
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  notes.splice(noteIndex, 1);
  res.status(204).send();
});

// Bidirectional sync - merge notes from all platforms
app.post('/api/sync', (req, res) => {
  const { notes: localNotes, platform } = req.body;
  
  if (!Array.isArray(localNotes)) {
    return res.status(400).json({ error: 'Notes array is required' });
  }
  
  // Create maps for efficient lookup
  const localNotesMap = new Map(localNotes.map(note => [note.id, note]));
  const remoteNotesMap = new Map(notes.map(note => [note.id, note]));
  
  // Merge strategy: combine all notes from all platforms
  const mergedNotes = [];
  const allNoteIds = new Set([
    ...localNotes.map(note => note.id),
    ...notes.map(note => note.id)
  ]);
  
  for (const noteId of allNoteIds) {
    const localNote = localNotesMap.get(noteId);
    const remoteNote = remoteNotesMap.get(noteId);
    
    if (localNote && remoteNote) {
      // Both exist - choose the most recently updated
      const localTime = new Date(localNote.updatedAt || localNote.createdAt);
      const remoteTime = new Date(remoteNote.updatedAt || remoteNote.createdAt);
      
      if (localTime > remoteTime) {
        mergedNotes.push(localNote);
      } else {
        mergedNotes.push(remoteNote);
      }
    } else if (localNote) {
      // Only exists locally - add it
      mergedNotes.push(localNote);
    } else if (remoteNote) {
      // Only exists remotely - keep it
      mergedNotes.push(remoteNote);
    }
  }
  
  // Update backend with merged notes
  notes = mergedNotes;
  
  res.json({ 
    message: 'Bidirectional sync completed successfully',
    syncedNotes: notes.length,
    platform: platform || 'web',
    lastSync: new Date().toISOString(),
    mergedNotes: notes // Return merged notes to client
  });
});

// Get sync status for platforms
app.get('/api/sync/status', (req, res) => {
  res.json({
    totalNotes: notes.length,
    lastSync: new Date().toISOString(),
    serverStatus: 'online',
    availablePlatforms: ['web', 'mobile']
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});
