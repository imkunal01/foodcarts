import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSetting extends Document {
    key: string;
    value: string;
    description: string;
    updatedAt: Date;
}

const siteSettingSchema = new Schema<ISiteSetting>({
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    value: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Static method to get a setting by key
siteSettingSchema.statics.getSetting = async function (key: string): Promise<string | null> {
    const setting = await this.findOne({ key });
    return setting ? setting.value : null;
};

export default mongoose.model<ISiteSetting>('SiteSetting', siteSettingSchema);
