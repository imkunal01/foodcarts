import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // Use App Password for Gmail
        }
    });
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('Email not configured. Skipping email notification.');
            console.log('To enable email notifications, set EMAIL_USER and EMAIL_PASS in .env');
            return false;
        }

        const transporter = createTransporter();

        await transporter.sendMail({
            from: `"Shreeyadunandan Website" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html
        });

        console.log('Email sent successfully to:', options.to);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export const sendInquiryNotification = async (inquiry: {
    name: string;
    email?: string;
    phone?: string;
    requirement: string;
    productName?: string;
}): Promise<boolean> => {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    if (!adminEmail) {
        console.log('No admin email configured for inquiry notifications');
        return false;
    }

    const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
        <h2 style="color: #B89551; margin-bottom: 20px;">New Inquiry Received!</h2>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <p><strong>Customer Name:</strong> ${inquiry.name}</p>
          ${inquiry.email ? `<p><strong>Email:</strong> ${inquiry.email}</p>` : ''}
          ${inquiry.phone ? `<p><strong>Phone:</strong> ${inquiry.phone}</p>` : ''}
          ${inquiry.productName ? `<p><strong>Product Interest:</strong> ${inquiry.productName}</p>` : ''}
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 5px;">
          <p><strong>Requirement:</strong></p>
          <p style="white-space: pre-wrap;">${inquiry.requirement}</p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        
        <p style="color: #666; font-size: 12px;">
          This is an automated notification from your Shreeyadunandan website.
        </p>
      </div>
    </div>
  `;

    return sendEmail({
        to: adminEmail,
        subject: `New Inquiry from ${inquiry.name}`,
        html
    });
};

export const generateWhatsAppLink = (inquiry: {
    name: string;
    phone?: string;
    requirement: string;
    productName?: string;
}): string => {
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '918599999394';

    let message = `New Inquiry:\n\nName: ${inquiry.name}`;
    if (inquiry.phone) message += `\nPhone: ${inquiry.phone}`;
    if (inquiry.productName) message += `\nProduct: ${inquiry.productName}`;
    message += `\n\nRequirement:\n${inquiry.requirement}`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};
