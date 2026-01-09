import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    category: 'reseller' | 'accessories' | 'new';
    price: number;
    originalPrice?: number;
    discount?: number;
    condition?: 'excellent' | 'good' | 'fair';
    images: string[];
    features: string[];
    inStock: boolean;
    createdAt: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['reseller', 'accessories', 'new'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    condition: {
        type: String,
        enum: ['excellent', 'good', 'fair']
    },
    images: [{
        type: String
    }],
    features: [{
        type: String
    }],
    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IProduct>('Product', productSchema);
