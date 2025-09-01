// Environment configuration for EmailJS
export const env = {
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
  }
};

// Validation function
export const validateEmailJSConfig = () => {
  const { serviceId, templateId, publicKey } = env.emailjs;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS configuration is incomplete. Please check your environment variables.');
    return false;
  }

  return true;
};
