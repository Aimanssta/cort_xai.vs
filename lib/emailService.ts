import nodemailer from 'nodemailer';

// Configure email service (using Gmail, SendGrid, or custom SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  cc?: string;
  bcc?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email service not configured - skipping send');
      return false;
    }

    await transporter.sendMail({
      from: options.from || process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      cc: options.cc,
      bcc: options.bcc,
    });

    console.log(`Email sent to ${options.to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Email Templates
export function generateLeadNotificationEmail(leadName: string, leadEmail: string, company: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">🎉 New Lead Received!</h1>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <p>A new lead just submitted the form on your website:</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5;">
          <p><strong>Name:</strong> ${leadName}</p>
          <p><strong>Email:</strong> <a href="mailto:${leadEmail}">${leadEmail}</a></p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <p style="margin: 20px 0;">
          <a href="https://cort-x-ai.vercel.app/#/leads" style="display: inline-block; background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
            View All Leads
          </a>
        </p>

        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
          This is an automated notification from Cort X AI. Do not reply to this email.
        </p>
      </div>
    </div>
  `;
}

export function generateDealClosedEmail(dealAmount: string, clientName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">💰 Deal Closed!</h1>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <p>Congratulations! A deal has been closed:</p>
        
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
          <p><strong>Amount:</strong> <span style="font-size: 24px; color: #10b981;">${dealAmount}</span></p>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
          This is an automated notification from Cort X AI.
        </p>
      </div>
    </div>
  `;
}

export function generateVerificationEmail(token: string, email: string): string {
  const verifyLink = `https://cort-x-ai.vercel.app/verify?token=${token}`;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Verify Your Email</h1>
      </div>
      <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
        <p>Please verify your email address by clicking the link below:</p>
        
        <p style="margin: 20px 0;">
          <a href="${verifyLink}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Verify Email
          </a>
        </p>

        <p style="color: #6b7280; font-size: 12px;">
          Or paste this link in your browser: <br/>
          <code style="background: white; padding: 10px; display: inline-block; margin-top: 5px; border-radius: 4px; border: 1px solid #e5e7eb;">${verifyLink}</code>
        </p>

        <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
          This link expires in 24 hours.
        </p>
      </div>
    </div>
  `;
}
