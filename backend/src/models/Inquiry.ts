import mongoose, { Document, Schema } from 'mongoose';

export interface IInquiry extends Document {
    name: string;
    email?: string;
    phone?: string;
    requirement: string;
    productId?: mongoose.Types.ObjectId;
    status: 'pending' | 'contacted' | 'resolved';
    createdAt: Date;
}

const inquirySchema = new Schema<IInquiry>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    requirement: {
        type: String,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'resolved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IInquiry>('Inquiry', inquirySchema);
