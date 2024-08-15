// Import the required modules
const fs = require('fs');  // File system module to read/write files
const path = require('path');  // Path module to handle file paths

// Define the path to the 'index.html' file in the React build output
const indexPath = path.join(__dirname, 'my-app/dist/index.html');

// Read the 'index.html' file
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    // If there is an error reading the file, log it
    console.error('Failed to read index.html:', err);
    return;
  }

  // Replace absolute paths (e.g., /assets/) with relative paths (e.g., ./assets/)
  const result = data.replace(/\/assets\//g, './assets/')
                     .replace(/\/cesium\//g, './cesium/');

  // Write the updated content back to the 'index.html' file
  fs.writeFile(indexPath, result, 'utf8', (err) => {
    if (err) {
      // If there is an error writing the file, log it
      console.error('Failed to write updated index.html:', err);
      return;
    }

    // Log success message
    console.log('index.html paths have been fixed!');
  });
});
