const express = require('express');
const morgan = require('morgan'); // Khai báo morgan
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
app.use(morgan('combined')); 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        dateFormat(value) {
            const date = new Date(value);

            if (Number.isNaN(date.getTime())) {
                return '';
            }

            return date.toLocaleDateString('en-GB');
        },
    },
}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('home', { blogs: [] });
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/search', (req, res) => {
    res.render('search');
});
app.get('/blogs/create', (req, res) => {
    res.render('create');
});
app.post('/blogs/create', (req, res) => {
    console.log("Dữ liệu nhận được từ Form: ", req.body);
    res.json(req.body);
});
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});