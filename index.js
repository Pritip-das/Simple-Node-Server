const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const routes = {
    '/': () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Welcome to my Server');
    },
    '/text': () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('This is a plain text response.');
    },
    '/html': () => {
      const htmlFilePath = path.join(__dirname, 'index.html');
      fs.readFile(htmlFilePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error loading HTML file.');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    },
    '/media/image': () => {
      const imgPath = path.join(__dirname, 'media', 'image.jpg');
      serveFile(res, imgPath, 'image/jpeg');
    },
    '/media/audio': () => {
      const audioPath = path.join(__dirname, 'media', 'merry-christmas-audio.mp3');
      serveFile(res, audioPath, 'audio/mpeg');
    },
    '/media/video': () => {
      const videoPath = path.join(__dirname, 'media', 'video.mp4');
      serveFile(res, videoPath, 'video/mp4');
    },
    '/pdf': () => {
      const pdfPath = path.join(__dirname, 'Holiday List.pdf');
      serveFile(res, pdfPath, 'application/pdf');
    },
  };

  if (routes[req.url]) {
    routes[req.url]();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Helper function to serve files
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading file.');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
