const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const logger = require('morgan');
// const bodyParser = require('body-parser');      //express 자체 내장 모듈이므로 별도 설치 불필요

const admin = require('./routes/admin');
const port = 3000;

// template 폴더 (view파일 path를 적어줌)
nunjucks.configure('template', {
    autoescape : true,          // false로 사용 시, html 태그가 작동이 되어 보안상 위험하다 => html부분에서 | safe를 붙여주면 부분 허용 가능
    express : app               // 위에서 선언한 express()를 담은 변수
});

// 미들웨어 셋팅
app.use( logger('dev'));
// app.use( bodyParser.json());
// app.use( bodyParser.urlencoded({ extended : false}));
app.use(express.urlencoded());
app.use(express.json());

// uploads 폴더 안의 모든 정적파일을 불러옴
app.use( '/uploads', express.static('uploads'));

app.use((req, res, next) => {
    app.locals.isLogin = true;
    next();
})

app.get('/', (req, res) => {
    res.send('express start');
});

// admin 이하의 모든 경로에서 작동하는 미들웨어
function vipMiddleware(req, res, next) {
    console.log('최우선 미들웨어');
    next();
}

// admin 이하 모든 경로를 잡아감
app.use('/admin', vipMiddleware, admin);

app.use( (req, res, _) => {
    res.status(400).render('common/404.html');
});

app.use( (req, res, _) => {
    res.status(500).render('common/500.html');
});


app.listen(port, () => {
    console.log('Express Listening on port', port);
});