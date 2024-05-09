const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), function (req, res, next) {
    res.send('Datei hochgeladen!');
  })

app.get('/uploads', function(req, res){
    res.sendFile(__dirname + '/uploads/');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
