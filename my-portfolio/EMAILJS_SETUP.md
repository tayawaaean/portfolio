# EmailJS Setup Guide

This guide will help you set up EmailJS for your portfolio contact form.

## 📧 Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create your account
3. Verify your email address

## ⚙️ Step 2: Set Up Email Service

1. In your EmailJS dashboard, click "Email Services" → "Add New Service"
2. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
3. Connect your email account and grant permissions
4. Note down your **Service ID**

## 📝 Step 3: Create Email Template

1. In your EmailJS dashboard, click "Email Templates" → "Create New Template"
2. Use the following template:

### Subject:
```
New Contact Form Submission - {{subject}}
```

### HTML Body:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 10px;">
            📧 New Contact Form Submission
        </h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Details:</h3>
            <p><strong>Name:</strong> {{user_name}}</p>
            <p><strong>Email:</strong> <a href="mailto:{{user_email}}" style="color: #00e5ff;">{{user_email}}</a></p>
            <p><strong>Subject:</strong> {{subject}}</p>
            <p><strong>Category:</strong> {{category}}</p>
            <p><strong>Budget Range:</strong> {{budget}}</p>
            <p><strong>Timeline:</strong> {{timeline}}</p>
        </div>

        <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <div style="white-space: pre-wrap; background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #00e5ff;">
                {{message}}
            </div>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>Reply to:</strong> <a href="mailto:{{user_email}}" style="color: #00e5ff;">{{user_email}}</a><br>
                <strong>Phone:</strong> +63 995 201 7559
            </p>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

        <div style="text-align: center; font-size: 12px; color: #666;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Portfolio: Aean Gabrielle Tayawa</p>
        </div>
    </div>
</body>
</html>
```

3. Save the template and note down your **Template ID**

## 🔑 Step 4: Get Your Public Key

1. In your EmailJS dashboard, go to "Account" → "General"
2. Copy your **Public Key**

## 🌐 Step 5: Configure Environment Variables

Create a `.env` file in your project root with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## ✅ Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Submit it and check your email
4. Verify you receive the formatted email

## 🐛 Troubleshooting

### Common Issues:

1. **"EmailJS is not defined" error:**
   - Make sure the EmailJS script is loaded in your HTML
   - Check that the script tag is in the `<head>` section

2. **"Invalid service/template ID" error:**
   - Double-check your Service ID, Template ID, and Public Key
   - Make sure they're copied correctly from EmailJS dashboard

3. **Emails not being sent:**
   - Verify your email service is properly connected
   - Check your spam folder
   - Make sure your email provider allows SMTP

### Environment Variables Not Loading:
- Make sure your `.env` file is in the project root
- Restart your development server after adding environment variables
- Use `VITE_` prefix for client-side variables

## 📞 Support

If you need help:
1. Check the [EmailJS Documentation](https://www.emailjs.com/docs/)
2. Open an issue on the EmailJS GitHub repository
3. Contact EmailJS support

## 🎯 Pro Tips

1. **Test regularly**: EmailJS has usage limits on free accounts
2. **Monitor usage**: Keep track of your monthly email sends
3. **Backup emails**: Consider setting up a backup email service
4. **Custom styling**: Modify the email template to match your brand
5. **Analytics**: EmailJS provides basic analytics in your dashboard

---

**Your EmailJS IDs:**
- Service ID: `_______________`
- Template ID: `_______________`
- Public Key: `_______________`

Fill in the blanks above once you complete the setup!
