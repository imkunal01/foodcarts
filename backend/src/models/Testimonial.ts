import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
    customerName: string;
    location: string;
    content: string;
    rating: number;
    isApproved: boolean;
    createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
