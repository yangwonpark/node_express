const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const admin = require('./routes/admin');
const contacts = require('./routes/contacts');
const port = 3000;

// template 폴더 (view파일 path를 적어줌)
nunjucks.configure('template', {
    autoescape : true,          // 보안
    express : app               // 위에서 선언한 express()를 담은 변수
});


app.get('/', (req, res) => {
    res.send('express start');
});

app.use('/admin', admin);
app.use('/contacts', contacts);

app.listen(port, () => {
    console.log('Express Listening on port', port);
});