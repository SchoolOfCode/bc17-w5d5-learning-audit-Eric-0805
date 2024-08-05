const express = require('express');
const helmet = require('helmet');
const { getArtists, getArtistById, createArtist, updateArtistById, deleteArtistById } = require('./artists');
const { getAlbums, getAlbumById, createAlbum } = require('./albums');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(helmet()); // Adding Helmet middleware for security

// Artists Routes
app.get('/artist/', async (req, res) => {
  try {
    const result = await getArtists();
    res.status(200).json({ success: true, payload: result });
  } catch (error) {
    res.status(500).json({ success: false, payload: error.message });
  }
});

app.get('/artist/:id', async (req, res) => {
  try {
    const result = await getArtistById(req.params.id);
    res.status(200).json({ success: true, payload: result });
  } catch (error) {
    res.status(500).json({ success: false, payload: error.message });
  }
});

app.post('/artist/', async (req, res) => {
  try {
    const result = await createArtist(req.body);
    if (!req.body.name) {
      res.status(404).json({ success: false, payload: 'Please provide a name for the updated artist' });
      return;
    }
    res.status(200).json({ success: true, payload: result });
  } catch (error) {
    res.status(500).json({ success: false, payload: error.message });
  }
});

app.patch('/artist/:id', async (req, res) => {
  try {
    const result = await updateArtistById(req.params.id, req.body);
    res.status(200).json({ success: true, payload: result });
  } catch (error) {
    res.status(500).json({ success: false, payload: error.message });
  }
});

app.delete('/artist/:id', async (req, res) => {
  try {
    const result = await deleteArtistById(req.params.id);
    res.status(200).json({ success: true, payload: result });
  } catch (error) {
    res.status(500).json({ success: false, payload: error.message });
  }
});

// Albums Routes
app.get('/album/', async (req, res) => {
  try {
    const result = await getAlbums();
    res.status(200).json({ success: true, payload: result });
  } catch (error) {
    res.status(500).json({ success: false, payload: error.message });
  }
});

app.get('/album/:id', async (req, res) => {
  try {
    const result = await getAlbumById(req.params.id);
    res.status(200).json({ success: true, payload: result });
  } catch (error) {
    res.status(500).json({ success: false, payload: error.message });
  }
});

app.post('/album/', async (req, res) => {
  try {
    const result = await createAlbum(req.body);
    res.status(200).json({ success: true, payload: result });
  } catch (error) {
    res.status(500).json({ success: false, payload: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
