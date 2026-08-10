const mongoose = require('mongoose');
const dns = require('dns');

const dnsServers = (process.env.MONGODB_DNS_SERVERS || '8.8.8.8,1.1.1.1')
    .split(',')
    .map(server => server.trim())
    .filter(Boolean);

dns.setServers(dnsServers);

// Tạo một hàm kết nối bất đồng bộ (async/await) để đảm bảo kết nối xong mới chạy tiếp
async function connect(){
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('Thiếu biến môi trường MONGODB_URI');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('✅ Kết nối Database thành công!');
    } catch (error) {
        console.log('❌ Kết nối Database thất bại!');
        console.log(`${error.name}: ${error.message}`);
    }
}

// Xuất hàm connect ra ngoài
module.exports = { connect };