const Blog = require('../models/Blog');

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

        if (formData.image) {
            try {
                const imageUrl = new URL(formData.image);

                if (!['http:', 'https:'].includes(imageUrl.protocol)) {
                    throw new Error('invalid image URL');
                }
            } catch {
                return res.status(400).render('create', {
                    error: 'Link hình ảnh phải bắt đầu bằng http:// hoặc https://, không dùng dữ liệu Base64.',
                    formData,
                });
            }
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