// EmailJS Configuration - with fallback values for development
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_aaem4yo',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_7r8vcml',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'PbCOxUhlSykrDrOa1'
};

// Development mode flag
export const isDevelopmentMode = () => {
  return EMAILJS_CONFIG.SERVICE_ID === 'your_actual_service_id' ||
         EMAILJS_CONFIG.TEMPLATE_ID === 'your_actual_template_id';
};

// Email template for contact form
export const EMAIL_TEMPLATE = {
  from_name: '{{user_name}}',
  from_email: '{{user_email}}',
  subject: '{{subject}}',
  category: '{{category}}',
  budget: '{{budget}}',
  timeline: '{{timeline}}',
  message: '{{message}}',
  to_name: 'Portfolio Owner',
  reply_to: '{{user_email}}'
};

// Initialize EmailJS (call this in your main app or component)
export const initEmailJS = () => {
  if (typeof window !== 'undefined' && (window as any).emailjs) {
    (window as any).emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
};

// Send email function with better error handling
export const sendContactEmail = async (formData: any) => {
  try {
    // Check if EmailJS is available
    if (!window || !(window as any).emailjs) {
      throw new Error('EmailJS is not loaded. Please check your internet connection.');
    }

    // Check configuration
    if (EMAILJS_CONFIG.SERVICE_ID === 'your_actual_service_id' ||
        EMAILJS_CONFIG.TEMPLATE_ID === 'your_actual_template_id' ||
        EMAILJS_CONFIG.PUBLIC_KEY === 'your_actual_public_key') {
      throw new Error('EmailJS is not configured. Please update your credentials in the .env file or contact the developer.');
    }

    console.log('Sending email with config:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
      hasPublicKey: !!EMAILJS_CONFIG.PUBLIC_KEY
    });

    // Initialize EmailJS
    (window as any).emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    const response = await (window as any).emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        category: formData.category,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        to_name: 'Aean Gabrielle Tayawa',
        reply_to: formData.email
      }
    );

    console.log('Email sent successfully:', response);
    return { success: true, data: response };
  } catch (error) {
    console.error('EmailJS error details:', error);

    // Provide specific error messages
    let errorMessage = 'Failed to send email. ';

    if (error instanceof Error) {
      if (error.message.includes('Invalid service')) {
        errorMessage += 'Please check your Service ID.';
      } else if (error.message.includes('Invalid template')) {
        errorMessage += 'Please check your Template ID.';
      } else if (error.message.includes('Invalid user')) {
        errorMessage += 'Please check your Public Key.';
      } else if (error.message.includes('not configured')) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again or contact me directly at tayawaaa@gmail.com or +63 995 201 7559.';
      }
    }

    return { success: false, error: errorMessage };
  }
};
