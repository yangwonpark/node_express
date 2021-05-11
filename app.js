const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const admin = require('./routes/admin');
const contacts = require('./routes/contacts');
const port = 3000;

// template 폴더 (view파일 path를 적어줌)
nunjucks.configure('template', {
    autoescape : true,          // false로 사용 시, html 태그가 작동이 되어 보안상 위험하다 => html부분에서 | safe를 붙여주면 부분 허용 가능
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