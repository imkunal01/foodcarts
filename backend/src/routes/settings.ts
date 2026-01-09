import express, { Request, Response } from 'express';
import SiteSetting from '../models/SiteSetting';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/settings
// @desc    Get all public settings
// @access  Public
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const settings = await SiteSetting.find();
        const settingsObj: Record<string, string> = {};
        settings.forEach(setting => {
            settingsObj[setting.key] = setting.value;
        });
        res.json(settingsObj);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   PUT /api/settings
// @desc    Update settings (upsert)
// @access  Private/Admin
router.put('/', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const updates = req.body; // { key: value, key2: value2, ... }

        for (const [key, value] of Object.entries(updates)) {
            await SiteSetting.findOneAndUpdate(
                { key },
                { key, value: value as string, updatedAt: new Date() },
                { upsert: true, new: true }
            );
        }

        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   POST /api/settings/init
// @desc    Initialize default settings (run once)
// @access  Private/Admin
router.post('/init', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const defaults = [
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

        for (const setting of defaults) {
            await SiteSetting.findOneAndUpdate(
                { key: setting.key },
                setting,
                { upsert: true }
            );
        }

        res.json({ message: 'Default settings initialized' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
