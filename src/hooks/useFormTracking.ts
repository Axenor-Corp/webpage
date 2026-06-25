import { useEffect, useRef } from 'react';
import { trackFormAbandonment } from '../lib/tracking';

/**
 * Hook para detectar abandono de formularios (Partial Fills).
 * Devuelve un ref que se debe asignar al <form>.
 */
export function useFormTracking(formId: string) {
  const formRef = useRef<HTMLFormElement>(null);
  const lastField = useRef<string | null>(null);
  const isSubmitted = useRef(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (target && target.name) {
        lastField.current = target.name;
      }
    };

    const handleSubmit = () => {
      isSubmitted.current = true;
    };

    form.addEventListener('focusin', handleFocusIn);
    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('focusin', handleFocusIn);
      form.removeEventListener('submit', handleSubmit);
      
      // Si se desmonta sin enviar y hubo algún campo modificado/enfocado
      if (!isSubmitted.current && lastField.current) {
        trackFormAbandonment(formId, lastField.current);
      }
    };
  }, [formId]);

  return formRef;
}
