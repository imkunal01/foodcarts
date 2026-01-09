import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';
import Certificate from './models/Certificate';
import Testimonial from './models/Testimonial';
import SiteSetting from './models/SiteSetting';
import User from './models/User';

dotenv.config();

const updateWithImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shreeyadunandan');
        console.log('Connected to MongoDB');

        // Delete existing products and recreate with images
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Create Reseller (Used) Products
        const resellerProducts = [
            {
                name: 'Momos Cart 2022 Model',
                description: 'Well-maintained momos/dumpling cart with 6-tier steamer unit, stainless steel body, glass display counter. Perfect for busy locations. Used for 1 year only.',
                category: 'reseller',
                price: 35000,
                originalPrice: 55000,
                discount: 36,
                condition: 'excellent',
                images: ['/images/products/food_cart_momos_1767069092377.png'],
                inStock: true
            },
            {
                name: 'Fresh Juice Counter',
                description: 'Modern juice bar cart with fruit display shelf, 3 blender stations, refrigerated storage. Includes 4 juice dispensers. Previously used in mall.',
                category: 'reseller',
                price: 28000,
                originalPrice: 45000,
                discount: 38,
                condition: 'good',
                images: ['/images/products/food_cart_juice_1767069108070.png'],
                inStock: true
            },
            {
                name: 'Multi-Purpose Snacks Stall',
                description: 'Versatile snacks cart for samosas, pakoras, chaat items. Hot plate section, glass display, storage below. Great for street vendors.',
                category: 'reseller',
                price: 22000,
                originalPrice: 32000,
                discount: 31,
                condition: 'good',
                images: ['/images/products/food_cart_snacks_1767069123065.png'],
                inStock: true
            },
            {
                name: 'Chaat & Street Food Cart',
                description: 'Professional chaat cart with multiple serving compartments, umbrella included. Vibrant colors attract customers. 2 years old.',
                category: 'reseller',
                price: 18500,
                originalPrice: 28000,
                discount: 34,
                condition: 'good',
                images: ['/images/products/food_cart_street_1767069163580.png'],
                inStock: true
            },
            {
                name: 'Ice Cream Parlor Cart',
                description: 'Mobile ice cream unit with freezer display, cone holder, toppings section. Vintage design. Great for events and fairs.',
                category: 'reseller',
                price: 42000,
                originalPrice: 65000,
                discount: 35,
                condition: 'excellent',
                images: ['/images/products/food_cart_icecream_1767069179005.png'],
                inStock: true
            }
        ];

        // Create New Products
        const newProducts = [
            {
                name: 'Premium Food Cabin Deluxe',
                description: 'Fully enclosed food cabin with AC, sliding windows, complete kitchen setup. LED lighting, stainless steel interior. Perfect for restaurants and cafes. Customizable colors.',
                category: 'new',
                price: 185000,
                originalPrice: 200000,
                discount: 8,
                images: ['/images/products/food_cabin_deluxe_1767069145946.png'],
                inStock: true
            },
            {
                name: 'Street Food Cart Pro',
                description: 'Professional grade street food cart with multiple cooking stations, ventilation hood, storage space. Suitable for all types of fast food.',
                category: 'new',
                price: 95000,
                images: ['/images/products/food_cart_street_1767069163580.png'],
                inStock: true
            },
            {
                name: 'Mobile Ice Cream Parlor',
                description: 'Complete ice cream parlor on wheels. Includes freezer unit, soft serve dispenser, topping bar. Eye-catching design.',
                category: 'new',
                price: 145000,
                originalPrice: 160000,
                discount: 9,
                images: ['/images/products/food_cart_icecream_1767069179005.png'],
                inStock: true
            },
            {
                name: 'Momos & Dumpling Station',
                description: 'Custom-built momos cart with 8-tier commercial steamer, prep counter, sauce station. High capacity for busy areas.',
                category: 'new',
                price: 75000,
                images: ['/images/products/food_cart_momos_1767069092377.png'],
                inStock: true
            },
            {
                name: 'Fresh Juice Bar Kiosk',
                description: 'Complete juice bar setup with commercial blenders, refrigerated fruit display, serving counter. Includes signage options.',
                category: 'new',
                price: 85000,
                originalPrice: 95000,
                discount: 11,
                images: ['/images/products/food_cart_juice_1767069108070.png'],
                inStock: true
            }
        ];

        // Create Accessories
        const accessories = [
            {
                name: 'Heavy Duty Alloy Wheels Set',
                description: 'Premium alloy caster wheels set (4 pcs). Industrial grade, swivel with brakes. 6-inch diameter. Chrome finish. Max load 500kg.',
                category: 'accessories',
                price: 8500,
                originalPrice: 10000,
                discount: 15,
                images: ['/images/products/accessory_wheels_1767069195213.png'],
                inStock: true
            },
            {
                name: 'LED Menu Display Board',
                description: 'Bright LED illuminated menu board. Programmable text display. Slim frame, wall or stand mountable. Attracts customers.',
                category: 'accessories',
                price: 12000,
                originalPrice: 15000,
                discount: 20,
                images: ['/images/products/accessory_led_1767069210546.png'],
                inStock: true
            },
            {
                name: 'Commercial Gas Burner (2 Burner)',
                description: 'Heavy duty cast iron gas burner. 2 burner design. LPG compatible. Stainless steel frame. High BTU output.',
                category: 'accessories',
                price: 4500,
                images: ['/images/products/accessory_burner_1767069228253.png'],
                inStock: true
            },
            {
                name: 'Stainless Steel Storage Cabinet',
                description: 'Under-counter storage cabinet. 304 stainless steel. Adjustable shelves. Lockable doors. 60cm x 45cm x 80cm.',
                category: 'accessories',
                price: 15000,
                images: ['/images/products/food_cart_snacks_1767069123065.png'],
                inStock: true
            },
            {
                name: 'Commercial Deep Fryer',
                description: 'Gas-powered deep fryer. 20L capacity. Temperature control. Includes basket and lid. Perfect for food carts.',
                category: 'accessories',
                price: 18000,
                originalPrice: 22000,
                discount: 18,
                images: ['/images/products/accessory_burner_1767069228253.png'],
                inStock: true
            }
        ];

        // Insert all products
        await Product.insertMany([...resellerProducts, ...newProducts, ...accessories]);
        console.log('✅ Created 15 products with images');

        // Update testimonials with more content
        await Testimonial.deleteMany({});
        const testimonials = [
            { customerName: 'Rajesh Kumar', location: 'Mumbai, Maharashtra', content: 'Excellent quality food cart! My momos business has grown 3x since I started using their cart. The build quality is top-notch and customers love the professional look. Highly recommended!', rating: 5, isApproved: true },
            { customerName: 'Priya Patel', location: 'Ahmedabad, Gujarat', content: 'Best price and quality combination in the market. The delivery was on time and the cart exceeded my expectations. Their team helped with customization too.', rating: 5, isApproved: true },
            { customerName: 'Mohammed Ali', location: 'Delhi NCR', content: 'I have been buying from Shreeyadunandan for 5 years now. Started with one cart, now I have a fleet of 8 carts across Delhi. Their after-sales service is amazing.', rating: 5, isApproved: true },
            { customerName: 'Sunita Sharma', location: 'Jaipur, Rajasthan', content: 'The juice cart I bought has been running smoothly for 2 years. Great design, durable materials, and the refrigeration works perfectly even in Rajasthan summer!', rating: 5, isApproved: true },
            { customerName: 'Vikram Singh', location: 'Bangalore, Karnataka', content: 'Professional service from start to finish. They understood my requirements perfectly and delivered a custom food cabin that fits my restaurant concept.', rating: 5, isApproved: true }
        ];
        await Testimonial.insertMany(testimonials);
        console.log('✅ Created 5 testimonials');

        // Update certificates with placeholder URLs
        await Certificate.deleteMany({});
        const certificates = [
            { name: 'GST Registration Certificate', type: 'gst', registrationNumber: '24AABCU9603R1ZM', imageUrl: '/images/products/certificat_placeholder.png' },
            { name: 'Import Export Code (IEC)', type: 'iec', registrationNumber: '0505XXXXXX', imageUrl: '/images/products/certificate_placeholder.png' },
            { name: 'Udyam Registration Certificate', type: 'udyam', registrationNumber: 'UDYAM-GJ-03-XXXXXXX', imageUrl: '/images/products/certificate_placeholder.png' }
        ];
        await Certificate.insertMany(certificates);
        console.log('✅ Created 3 certificates');

        // Ensure admin user exists
        const existingAdmin = await User.findOne({ email: 'admin@shreeyadunandan.in' });
        if (!existingAdmin) {
            await User.create({
                name: 'Admin',
                email: 'admin@shreeyadunandan.in',
                password: 'admin123',
                role: 'admin'
            });
            console.log('✅ Admin user created');
        }

        // Update site settings
        const settings = [
            { key: 'stats_customers', value: '6500', description: 'Happy Customers' },
            { key: 'stats_cities', value: '500', description: 'Cities Served' },
            { key: 'stats_experience', value: '35', description: 'Years Experience' },
            { key: 'stats_products', value: '1000', description: 'Products' },
            { key: 'company_phone', value: '+91 85999 99394', description: 'Phone' },
            { key: 'company_email', value: 'info@shreeyadunandan.in', description: 'Email' },
            { key: 'company_address', value: 'Rajkot, Gujarat, India - 360001', description: 'Address' },
            { key: 'company_whatsapp', value: '918599999394', description: 'WhatsApp' },
            { key: 'working_hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM', description: 'Hours' },
            { key: 'year_founded', value: '1988', description: 'Founded' }
        ];
        for (const s of settings) {
            await SiteSetting.findOneAndUpdate({ key: s.key }, s, { upsert: true });
        }
        console.log('✅ Settings updated');

        console.log('\n🎉 Database updated with images and complete data!');
        console.log('\nProducts summary:');
        console.log(`  - Reseller (used): ${resellerProducts.length}`);
        console.log(`  - New products: ${newProducts.length}`);
        console.log(`  - Accessories: ${accessories.length}`);
        console.log(`  - Testimonials: ${testimonials.length}`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateWithImages();
