# Newsletter Email Setup Guide

This guide explains how to set up the newsletter email functionality using EmailJS.

## Overview

The footer newsletter signup feature uses [EmailJS](https://www.emailjs.com/) to send confirmation emails to subscribers without requiring a backend server.

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

### 2. Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note your **Service ID** (you'll need this later)

### 3. Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following variables in your template:
   - `{{to_email}}` - Subscriber's email address
   - `{{from_name}}` - ANR Fitness Club
   - `{{message}}` - Confirmation message
   - `{{reply_to}}` - contact@anrfitness.com

Example template:
```
Subject: Welcome to ANR Fitness Club Newsletter! 🏋️

Hi there!

{{message}}

We're excited to have you as part of our fitness community!

Best regards,
{{from_name}}

---
If you have any questions, reply to {{reply_to}}
```

4. Save the template and note your **Template ID**

### 4. Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy this key

### 5. Configure the Application

1. Open `src/components/Footer.jsx`
2. Find these lines (around line 70-75):
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with actual public key

await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your service ID
  'YOUR_TEMPLATE_ID',   // Replace with your template ID
  templateParams
);
```

3. Replace the placeholders:
   - `YOUR_PUBLIC_KEY` → Your EmailJS Public Key
   - `YOUR_SERVICE_ID` → Your Service ID
   - `YOUR_TEMPLATE_ID` → Your Template ID

### Example Configuration

```javascript
emailjs.init('xYz123ABC_publicKey');

await emailjs.send(
  'service_abc123',
  'template_xyz789',
  templateParams
);
```

## Testing

1. After configuration, rebuild the application:
```bash
npm run build
npm run dev
```

2. Scroll to the footer
3. Enter a valid email address
4. Click "Subscribe Now"
5. Check your email inbox for the confirmation message

## Troubleshooting

### Email not sending?

1. **Check the browser console** for error messages
2. **Verify your credentials** are correct in Footer.jsx
3. **Check EmailJS dashboard** → Email Services → ensure service is connected
4. **Email quota** - Free plan allows 200 emails/month
5. **Spam folder** - Check if confirmation email went to spam

### Common Issues

- **"Failed to subscribe"** - Usually means incorrect Service ID or Template ID
- **Network error** - Check your internet connection
- **Invalid email** - Fake domains (test.com, example.com) are blocked by validation

## Monthly Limits

- **Free Plan**: 200 emails/month
- **Personal Plan**: $9/month - 1,000 emails
- **Professional Plan**: $35/month - 10,000 emails

## Security Notes

- EmailJS public key is safe to expose in frontend code
- The public key only allows sending emails through your configured templates
- Never share your EmailJS account password

## Alternative Services

If you prefer other email services:
- **Web3Forms** - https://web3forms.com/ (250 emails/month free)
- **SendGrid** - https://sendgrid.com/ (requires backend)
- **Formspree** - https://formspree.io/ (50 emails/month free)

## Support

For EmailJS support:
- Documentation: https://www.emailjs.com/docs/
- FAQ: https://www.emailjs.com/docs/faq/
- Support: support@emailjs.com
