import express, { Request, Response } from 'express';
import Certificate from '../models/Certificate';
import { protect, adminOnly, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/certificates
// @desc    Get all certificates
// @access  Public
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   POST /api/certificates
// @desc    Create a certificate
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const certificate = await Certificate.create(req.body);
        res.status(201).json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   PUT /api/certificates/:id
// @desc    Update a certificate
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!certificate) {
            res.status(404).json({ message: 'Certificate not found' });
            return;
        }
        res.json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// @route   DELETE /api/certificates/:id
// @desc    Delete a certificate
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const certificate = await Certificate.findByIdAndDelete(req.params.id);
        if (!certificate) {
            res.status(404).json({ message: 'Certificate not found' });
            return;
        }
        res.json({ message: 'Certificate removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
