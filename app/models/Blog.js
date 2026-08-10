const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa Schema cho Blog
const Blog = new Schema({
    name: { type: String, maxLength: 255 }, // Tiêu đề bài viết
    description: { type: String, maxLength: 600 }, // Mô tả ngắn
    image: {
        type: String,
        trim: true,
        maxLength: 5 * 1024 * 1024,
        validate: {
            validator(value) {
                if (!value) return true;

                if (value.startsWith('data:image/')) {
                    return /^data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/]+={0,2}$/.test(value);
                }

                try {
                    const url = new URL(value);
                    return url.protocol === 'http:' || url.protocol === 'https:';
                } catch {
                    return false;
                }
            },
            message: 'image phải là URL http/https hoặc dữ liệu ảnh Base64 hợp lệ',
        },
    }, // URL hoặc Data URL ảnh Base64
    slug: { type: String, maxLength: 255 }, // Đường dẫn URL thân thiện
    createdAt: { type: Date, default: Date.now }, // Tự động lưu thời gian tạo
    updatedAt: { type: Date, default: Date.now }  // Tự động lưu thời gian cập nhật
});

// Xuất Model có tên là 'Blog' để sử dụng ở Controller
module.exports = mongoose.model('Blog', Blog);