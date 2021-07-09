const path = require('path');
const http = require('http');
const cors = require('cors');
const express = require('express');
const app = express();


// Set static folder

app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors())
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

