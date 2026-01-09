import express, { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/testimonials
// @desc    Get approved testimonials (public)
// @access  Public
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   GET /api/testimonials/all
// @desc    Get all testimonials (admin)
// @access  Private/Admin
router.get('/all', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   POST /api/testimonials
// @desc    Submit a testimonial (customer)
// @access  Public
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { customerName, location, content, rating } = req.body;

        const testimonial = await Testimonial.create({
            customerName,
            location,
            content,
            rating,
            isApproved: false // Admin needs to approve
        });

        res.status(201).json({
            message: 'Thank you for your review! It will be visible after approval.',
            testimonial
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   PUT /api/testimonials/:id/approve
// @desc    Approve a testimonial
// @access  Private/Admin
router.put('/:id/approve', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );
        if (!testimonial) {
            res.status(404).json({ message: 'Testimonial not found' });
            return;
        }
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            res.status(404).json({ message: 'Testimonial not found' });
            return;
        }
        res.json({ message: 'Testimonial removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
