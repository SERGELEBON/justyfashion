import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

export function useToast() {
  const toast = ({ title, description, duration = 4000 }: ToastOptions) => {
    sonnerToast(title, {
      description,
      duration,
    });
  };

  return { toast };
}

export { sonnerToast as toast };
