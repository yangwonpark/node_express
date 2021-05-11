const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('admin 이후 url');
});

router.get('/products', (req, res) => {
    // res.send('admin products');             // text를 보여줌

    // render(뿌려줄 view 파일) => app.js에서 nunjucks로 선언한 path 이후의 경로만 적어주면 됨
    res.render('admin/products.html' , {
        message : 'hello!!!!!!!!!!!!!',          // 여기서 선언한 message => html 파일의 {{ message }}
        online : 'express'
    });        
});

module.exports = router;

