const siteRouter = require('./site');
const blogRouter = require('./blog');

function route(app){
    // Route blog sẽ được gắn vào đường dẫn gốc /blogs
    app.use('/blogs', blogRouter);

    // Mọi luồng truy cập cơ bản sẽ được đẩy sang cho siteRouter xử lý
    app.use('/', siteRouter);
}

module.exports = route;