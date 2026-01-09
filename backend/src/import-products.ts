import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';
import SiteSetting from './models/SiteSetting';

dotenv.config();

interface ResellerItem {
    id: string;
    name: string;
    price: string;
    mrp?: string;
    images: string[];
    status: string;
    used_time?: string;
    url: string;
}

interface AccessoryItem {
    id: string;
    name: string;
    price: string;
    mrp?: string;
    image: string;
    url: string;
}

const fetchResellerProducts = async (): Promise<ResellerItem[]> => {
    try {
        console.log('Fetching reseller products from shreeyadunandan.in...');
        const response = await fetch('https://shreeyadunandan.in/reseller_api.php?page=1&perPage=50');
        const data = await response.json() as { items?: ResellerItem[] };
        console.log(`Found ${data.items?.length || 0} reseller products`);
        return data.items || [];
    } catch (error) {
        console.error('Error fetching reseller products:', error);
        return [];
    }
};

const fetchAccessoryProducts = async (): Promise<AccessoryItem[]> => {
    try {
        console.log('Fetching accessory products from shreeyadunandan.in...');
        const response = await fetch('https://shreeyadunandan.in/accessories_api1.php?page=1&perPage=50');
        const data = await response.json() as { items?: AccessoryItem[] };
        console.log(`Found ${data.items?.length || 0} accessory products`);
        return data.items || [];
    } catch (error) {
        console.error('Error fetching accessory products:', error);
        return [];
    }
};

const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    // Remove currency symbols, commas, and extract number
    const cleaned = priceStr.replace(/[₹,\s]/g, '');
    return parseInt(cleaned) || 0;
};

const determineCondition = (usedTime?: string): 'excellent' | 'good' | 'fair' => {
    if (!usedTime) return 'good';
    const lower = usedTime.toLowerCase();
    if (lower.includes('month') || lower.includes('new') || lower.includes('1 year')) {
        return 'excellent';
    } else if (lower.includes('2 year') || lower.includes('3 year')) {
        return 'good';
    }
    return 'fair';
};

const importProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shreeyadunandan');
        console.log('Connected to MongoDB');

        // Fetch products from original website
        const resellerItems = await fetchResellerProducts();
        const accessoryItems = await fetchAccessoryProducts();

        // Import Reseller Products
        console.log('\nImporting reseller products...');
        for (const item of resellerItems) {
            const price = parsePrice(item.price);
            const originalPrice = item.mrp ? parsePrice(item.mrp) : undefined;
            const discount = originalPrice && originalPrice > price
                ? Math.round((1 - price / originalPrice) * 100)
                : undefined;

            try {
                await Product.findOneAndUpdate(
                    { name: item.name },
                    {
                        name: item.name,
                        description: `Used food cart - ${item.used_time || 'Previously owned'}`,
                        category: 'reseller',
                        price,
                        originalPrice,
                        discount,
                        condition: determineCondition(item.used_time),
                        images: item.images || [],
                        inStock: item.status?.toLowerCase() === 'available',
                    },
                    { upsert: true, new: true }
                );
                console.log(`  ✓ ${item.name}`);
            } catch (err) {
                console.log(`  ✗ Failed: ${item.name}`);
            }
        }

        // Import Accessory Products
        console.log('\nImporting accessory products...');
        for (const item of accessoryItems) {
            const price = parsePrice(item.price);
            const originalPrice = item.mrp ? parsePrice(item.mrp) : undefined;
            const discount = originalPrice && originalPrice > price
                ? Math.round((1 - price / originalPrice) * 100)
                : undefined;

            try {
                await Product.findOneAndUpdate(
                    { name: item.name },
                    {
                        name: item.name,
                        description: 'Quality accessory for food carts',
                        category: 'accessories',
                        price,
                        originalPrice,
                        discount,
                        images: item.image ? [item.image] : [],
                        inStock: true,
                    },
                    { upsert: true, new: true }
                );
                console.log(`  ✓ ${item.name}`);
            } catch (err) {
                console.log(`  ✗ Failed: ${item.name}`);
            }
        }

        // Initialize default settings if not exist
        console.log('\nInitializing site settings...');
        const defaultSettings = [
            { key: 'stats_customers', value: '6500', description: 'Happy Customers count' },
            { key: 'stats_cities', value: '500', description: 'Cities Served count' },
            { key: 'stats_experience', value: '35', description: 'Years of Experience' },
            { key: 'stats_products', value: '1000', description: 'Total Products count' },
            { key: 'company_phone', value: '+91 85999 99394', description: 'Company phone' },
            { key: 'company_email', value: 'info@shreeyadunandan.in', description: 'Company email' },
            { key: 'company_address', value: 'Rajkot, Gujarat, India - 360001', description: 'Address' },
            { key: 'company_whatsapp', value: '918599999394', description: 'WhatsApp number' },
            { key: 'working_hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM', description: 'Working hours' },
            { key: 'year_founded', value: '1988', description: 'Year founded' },
        ];

        for (const setting of defaultSettings) {
            await SiteSetting.findOneAndUpdate({ key: setting.key }, setting, { upsert: true });
        }
        console.log('✓ Site settings initialized');

        // Summary
        const totalReseller = await Product.countDocuments({ category: 'reseller' });
        const totalAccessories = await Product.countDocuments({ category: 'accessories' });
        const totalNew = await Product.countDocuments({ category: 'new' });

        console.log('\n🎉 Import Complete!');
        console.log(`  Reseller products: ${totalReseller}`);
        console.log(`  Accessories: ${totalAccessories}`);
        console.log(`  New products: ${totalNew}`);
        console.log('\nNote: "New Products" from the original site requires HTML parsing.');
        console.log('You can manually add new products via API or MongoDB.');

        process.exit(0);
    } catch (error) {
        console.error('Error importing products:', error);
        process.exit(1);
    }
};

importProducts();
