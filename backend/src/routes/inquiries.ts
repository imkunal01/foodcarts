import express, { Request, Response } from 'express';
import Inquiry from '../models/Inquiry';
import Product from '../models/Product';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';
import { sendInquiryNotification } from '../utils/email';

const router = express.Router();

// @route   POST /api/inquiries
// @desc    Submit a new inquiry
// @access  Public
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, requirement, productId } = req.body;

        // Create inquiry in database
        const inquiry = await Inquiry.create({
            name,
            email,
            phone,
            requirement,
            productId
        });

        // Get product name if productId is provided
        let productName: string | undefined;
        if (productId) {
            const product = await Product.findById(productId);
            productName = product?.name;
        }

        // Send email notification to admin
        await sendInquiryNotification({
            name,
            email,
            phone,
            requirement,
            productName
        });

        res.status(201).json({
            message: 'Inquiry submitted successfully! We will contact you soon.',
            inquiry
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const inquiries = await Inquiry.find().populate('productId').sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/inquiries/:id
// @desc    Get single inquiry
// @access  Private/Admin
router.get('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const inquiry = await Inquiry.findById(req.params.id).populate('productId');
        if (!inquiry) {
            res.status(404).json({ message: 'Inquiry not found' });
            return;
        }
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!inquiry) {
            res.status(404).json({ message: 'Inquiry not found' });
            return;
        }
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete an inquiry
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!inquiry) {
            res.status(404).json({ message: 'Inquiry not found' });
            return;
        }
        res.json({ message: 'Inquiry removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
