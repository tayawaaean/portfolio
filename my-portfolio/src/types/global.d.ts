declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// EmailJS global types
declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, templateParams: any) => Promise<any>;
    };
  }
}