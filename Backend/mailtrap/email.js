import nodemailer from 'nodemailer';
// const nodemailer = require("nodemailer");
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js"

const sender = process.env.EMAIL_USER;

// Fixed SMTP configuration
const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  // Changed from service to host
    port: 465,              // Added port
    secure: true,           // For port 465, secure should be true
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter configuration
mailTransporter.verify(function(error, success) {
    if (error) {
        console.log("Email transporter error:", error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// Exported Functions for Sending Emails
export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
            "{verificationCode}",
            verificationToken
        );
        const response = await mailTransporter.sendMail({
            from: `"Your App Name" <${sender}>`,  // Added proper sender format
            to: email,
            subject: "Verify your email",
            html: htmlContent,
        });
        console.log("Verification email sent successfully", response);
    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        const htmlContent = WELCOME_EMAIL_TEMPLATE(name);
        const response = await mailTransporter.sendMail({
            from: `"Your App Name" <${sender}>`,
            to: email,
            subject: "Welcome to Our Platform",
            html: htmlContent,
        });
        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
            "{resetURL}",
            resetURL
        );
        const response = await mailTransporter.sendMail({
            from: `"Your App Name" <${sender}>`,
            to: email,
            subject: "Reset your password",
            html: htmlContent,
        });
        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset email", error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

export const sendResetSuccessEmail = async (email) => {
    try {
        const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE;
        const response = await mailTransporter.sendMail({
            from: `"Your App Name" <${sender}>`,
            to: email,
            subject: "Password reset successfully",
            html: htmlContent,
        });
        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset success email", error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};

// import nodemailer from 'nodemailer';
// import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js"
// const sender = process.env.EMAIL_USER;

// const mailTransporter = nodemailer.createTransport({
//   service: "smtp.gmail.com",
//   port : 465,
//   secure: true, // Using Gmail as the SMTP service
//   auth: {
//     user: process.env.EMAIL_USER, // Gmail credentials
//     pass: process.env.EMAIL_PASS, // Gmail password (or app-specific password if 2FA is enabled)
//   },
// });

// // Exported Functions for Sending Emails
// export const sendVerificationEmail = async (email, verificationToken) => {
//   try {
//     const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
//       "{verificationCode}",
//       verificationToken
//     );

//     const response = await mailTransporter.sendMail({
//       from: sender, // Sender address
//       to: email, // Recipient email
//       subject: "Verify your email", // Email subject
//       html: htmlContent, // HTML content
//     });

//     console.log("Verification email sent successfully", response);
//   } catch (error) {
//     console.error("Error sending verification email", error);
//     throw new Error(`Error sending verification email: ${error}`);
//   }
// };

// export const sendWelcomeEmail = async (email, name) => {
//   try {
//     const htmlContent = WELCOME_EMAIL_TEMPLATE(name);

//     const response = await mailTransporter.sendMail({
//       from: sender, // Sender address
//       to: email, // Recipient email
//       subject: "Welcome to Ou@r Platform", // Email subject
//       html: htmlContent, // HTML content
//     });

//     console.log("Welcome email sent successfully", response);
//   } catch (error) {
//     console.error("Error sending welcome email", error);
//     throw new Error(`Error sending welcome email: ${error}`);
//   }
// };

// export const sendPasswordResetEmail = async (email, resetURL) => {
//   try {
//     const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
//       "{resetURL}",
//       resetURL
//     );

//     const response = await mailTransporter.sendMail({
//       from: sender, // Sender address
//       to: email, // Recipient email
//       subject: "Reset your password", // Email subject
//       html: htmlContent, // HTML content
//     });

//     console.log("Password reset email sent successfully", response);
//   } catch (error) {
//     console.error("Error sending password reset email", error);
//     throw new Error(`Error sending password reset email: ${error}`);
//   }
// };

// export const sendResetSuccessEmail = async (email) => {
//   try {
//     const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE;

//     const response = await mailTransporter.sendMail({
//       from: sender, // Sender address
//       to: email, // Recipient email
//       subject: "Password reset successfully", // Email subject
//       html: htmlContent, // HTML content
//     });

//     console.log("Password reset success email sent successfully", response);
//   } catch (error) {
//     console.error("Error sending password reset success email", error);
//     throw new Error(`Error sending password reset success email: ${error}`);
//   }
// };