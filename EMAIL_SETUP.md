# Email Setup Guide for Contact Form

To make your contact form functional and send emails to `vaibhavshukla565@gmail.com`, you need to set up EmailJS. Follow these steps:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Note down the **Service ID**

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down the **Template ID**

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key**

## Step 5: Update Your Code

Replace the placeholder values in `script-simple.js`:

```javascript
// Line 165: Replace YOUR_PUBLIC_KEY with your actual public key
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY");

// Line 187: Replace YOUR_SERVICE_ID with your service ID
"YOUR_ACTUAL_SERVICE_ID",

// Line 188: Replace YOUR_TEMPLATE_ID with your template ID
"YOUR_ACTUAL_TEMPLATE_ID",
```

## Step 6: Test

1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email at `vaibhavshukla565@gmail.com`

## Free Tier Limits

- EmailJS free tier allows 200 emails per month
- Perfect for a personal portfolio

## Troubleshooting

- Make sure all IDs are correct
- Check browser console for errors
- Verify your email service is properly connected in EmailJS dashboard

Once configured, all contact form submissions will be sent directly to your email!
