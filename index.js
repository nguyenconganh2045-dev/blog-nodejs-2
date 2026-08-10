require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');

const app = express();
// Nạp module db (Node.js tự động tìm file index.js trong thư mục db)
const db = require('./config/db');

// Thực thi hàm kết nối
db.connect();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '8mb' }));
const methodOverride = require('method-override');

// Ghi đè phương thức HTTP thông qua tham số _method trên URL
app.use(methodOverride('_method'));
app.use(express.json({ limit: '8mb' }));

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

route(app);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server đang chạy tại http://localhost:${port}`);
    });
}

module.exports = { app, port };