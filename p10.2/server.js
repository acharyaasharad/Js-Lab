const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3001;
const server = http.createServer((req, res) => {
  // Handle POST request to save a new employee
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const newEmployee = JSON.parse(body);
        
        // Read existing JSON file
        const filePath = path.join(__dirname, 'employees.json');
        let currentData = [];
        if (fs.existsSync(filePath)) {
            currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        
        // Add new employee to the list
        currentData.push(newEmployee);
        
        // Write the updated list back to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf8');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Saved successfully' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve static files (index.html, script.js, employees.json)
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  let extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Please open your browser and go to http://localhost:${PORT}/`);
});
