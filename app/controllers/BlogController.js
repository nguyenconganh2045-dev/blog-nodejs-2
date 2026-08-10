const Blog = require('../models/Blog');

function isValidImage(value) {
    if (!value) return true;

    if (value.startsWith('data:image/')) {
        return /^data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/]+={0,2}$/.test(value);
    }

    try {
        const imageUrl = new URL(value);
        return ['http:', 'https:'].includes(imageUrl.protocol);
    } catch {
        return false;
    }
}

class BlogController{
    // [GET] /blogs/create (Hiển thị form)
    create(req, res, next) {
        res.render('create');
    }

    // [POST] /blogs/store (Xử lý dữ liệu)
    store(req, res, next) {
        // Lấy dữ liệu người dùng nhập từ req.body
        const formData = {
            ...req.body,
            image: req.body.image?.trim(),
        };

        if (!isValidImage(formData.image) || formData.image.length > 5 * 1024 * 1024) {
            return res.status(400).render('create', {
                error: 'Ảnh phải là URL http/https hoặc Base64 ảnh hợp lệ và không vượt quá 5 MB.',
                formData,
            });
        }

        // Khởi tạo một đối tượng Blog mới dựa trên dữ liệu form
        const blog = new Blog(formData);
        
        // Lưu vào Database
        blog.save()
            .then(() => {
                // Lưu thành công thì tự động chuyển hướng về Trang chủ
                res.redirect('/');
            })
            .catch(error => {
                // Báo lỗi nếu lưu thất bại
                next(error);
            });
    }
    // [GET] /blogs/:slug
    show(req, res, next) {
        Blog.findOne({ slug: req.params.slug }).lean()
            .then(blog => {
                res.render('detail', { blog: blog });
            })
            .catch(next);
    }
}

module.exports = new BlogController();