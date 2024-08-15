const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');  // Import the cors package
const app = express();
const port = 3456;

const tilesPath = path.join(__dirname, 'Mapnik');

// Verify the directory exists
if (!fs.existsSync(tilesPath)) {
    console.error('The tiles directory does not exist:', tilesPath);
} else {
    console.log('Serving tiles from:', tilesPath);
}

// Enable CORS for all routes
app.use(cors());

// Serve the map tiles
app.use('/map-tiles', express.static(tilesPath));

app.get('/', (req, res) => {
    res.send('Map Tile Server is running');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
