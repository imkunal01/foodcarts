import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate extends Document {
    name: string;
    type: 'gst' | 'iec' | 'udyam' | 'other';
    registrationNumber: string;
    imageUrl: string;
    downloadUrl?: string;
    createdAt: Date;
}

const certificateSchema = new Schema<ICertificate>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['gst', 'iec', 'udyam', 'other'],
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    downloadUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<ICertificate>('Certificate', certificateSchema);
