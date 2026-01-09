import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Product from './models/Product';
import Certificate from './models/Certificate';
import Testimonial from './models/Testimonial';
import SiteSetting from './models/SiteSetting';

dotenv.config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shreeyadunandan');
        console.log('Connected to MongoDB');

        // Clear existing data (optional - comment out if you don't want to clear)
        // await User.deleteMany({});
        // await Product.deleteMany({});
        // await Certificate.deleteMany({});
        // await Testimonial.deleteMany({});
        // await SiteSetting.deleteMany({});

        // Create admin user if not exists
        const existingAdmin = await User.findOne({ email: 'admin@shreeyadunandan.in' });
        if (!existingAdmin) {
            await User.create({
                name: 'Admin',
                email: 'admin@shreeyadunandan.in',
                password: 'admin123', // Change this!
                role: 'admin'
            });
            console.log('✅ Admin user created (email: admin@shreeyadunandan.in, password: admin123)');
        }

        // Create default settings if not exist
        const defaultSettings = [
            { key: 'stats_customers', value: '6500', description: 'Happy Customers count' },
            { key: 'stats_cities', value: '500', description: 'Cities Served count' },
            { key: 'stats_experience', value: '35', description: 'Years of Experience' },
            { key: 'stats_products', value: '1000', description: 'Total Products count' },
            { key: 'company_phone', value: '+91 85999 99394', description: 'Company phone number' },
            { key: 'company_email', value: 'info@shreeyadunandan.in', description: 'Company email' },
            { key: 'company_address', value: 'Rajkot, Gujarat, India - 360001', description: 'Company address' },
            { key: 'company_whatsapp', value: '918599999394', description: 'WhatsApp number (without +)' },
            { key: 'working_hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM', description: 'Working hours' },
            { key: 'year_founded', value: '1988', description: 'Year company was founded' },
        ];

        for (const setting of defaultSettings) {
            await SiteSetting.findOneAndUpdate(
                { key: setting.key },
                setting,
                { upsert: true }
            );
        }
        console.log('✅ Default settings initialized');

        // Create sample products if none exist
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            const sampleProducts = [
                // Reseller (Used) Products
                { name: 'Momos Cart (2022)', description: 'Well maintained momos cart with steamer', category: 'reseller', price: 35000, originalPrice: 55000, discount: 36, condition: 'excellent', images: [], inStock: true },
                { name: 'Juice Counter', description: 'Fresh juice counter with display', category: 'reseller', price: 28000, originalPrice: 45000, discount: 38, condition: 'good', images: [], inStock: true },
                { name: 'Snacks Stall', description: 'Multi-purpose snacks stall', category: 'reseller', price: 22000, condition: 'fair', images: [], inStock: true },

                // New Products
                { name: 'Food Cabin Deluxe', description: 'Premium food cabin with all amenities', category: 'new', price: 185000, originalPrice: 200000, discount: 8, images: [], inStock: true },
                { name: 'Street Food Cart Pro', description: 'Professional grade street food cart', category: 'new', price: 95000, images: [], inStock: true },
                { name: 'Ice Cream Parlor Mobile', description: 'Fully equipped mobile ice cream parlor', category: 'new', price: 145000, originalPrice: 160000, discount: 9, images: [], inStock: true },

                // Accessories
                { name: 'Alloy Wheels Set', description: 'Premium alloy wheels for food carts', category: 'accessories', price: 8500, images: [], inStock: true },
                { name: 'LED Display Board', description: 'Bright LED menu display board', category: 'accessories', price: 12000, images: [], inStock: true },
                { name: 'Gas Burner Commercial', description: 'Heavy duty commercial gas burner', category: 'accessories', price: 4500, images: [], inStock: true },
            ];

            await Product.insertMany(sampleProducts);
            console.log('✅ Sample products created');
        }

        // Create sample certificates if none exist
        const certCount = await Certificate.countDocuments();
        if (certCount === 0) {
            const sampleCerts = [
                { name: 'GST Registration', type: 'gst', registrationNumber: '24XXXXX1234X1Z5', imageUrl: '' },
                { name: 'IEC Certificate', type: 'iec', registrationNumber: 'IECXXXXXXXX', imageUrl: '' },
                { name: 'Udyam Registration', type: 'udyam', registrationNumber: 'UDYAM-GJ-XX-XXXXXXX', imageUrl: '' },
            ];

            await Certificate.insertMany(sampleCerts);
            console.log('✅ Sample certificates created');
        }

        // Create sample testimonials if none exist
        const testimonialCount = await Testimonial.countDocuments();
        if (testimonialCount === 0) {
            const sampleTestimonials = [
                { customerName: 'Rajesh Kumar', location: 'Mumbai, Maharashtra', content: 'Excellent quality food cart! My business has grown significantly since I started using their products. Highly recommended!', rating: 5, isApproved: true },
                { customerName: 'Priya Patel', location: 'Ahmedabad, Gujarat', content: 'Best price and quality combination. The delivery was on time and the cart exceeded my expectations.', rating: 5, isApproved: true },
                { customerName: 'Mohammed Ali', location: 'Delhi', content: 'I have been buying from Shreeyadunandan for 5 years. Their after-sales service is amazing.', rating: 5, isApproved: true },
            ];

            await Testimonial.insertMany(sampleTestimonials);
            console.log('✅ Sample testimonials created');
        }

        console.log('\n🎉 Database seeding complete!');
        console.log('\nYou can now:');
        console.log('1. Login as admin: admin@shreeyadunandan.in / admin123');
        console.log('2. Add/edit products, certificates, testimonials via API');
        console.log('3. Update settings via API or directly in MongoDB');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
