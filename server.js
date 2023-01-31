const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/.well_known', express.static(path.join(__dirname, '.well_known')));

app.get('/logo', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'logo.png'));
});

app.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie ${port}`);
});
