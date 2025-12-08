import { useEffect, useState } from 'react';

/**
 * Hook para cargar el SDK de PayPal dinámicamente usando variables de entorno
 */
export const usePayPalScript = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si ya está cargado, no hacer nada
    if (window.paypal) {
      setLoaded(true);
      return;
    }

    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    
    if (!clientId) {
      setError('PayPal Client ID no configurado');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;

    script.onload = () => {
      setLoaded(true);
    };

    script.onerror = () => {
      setError('Error al cargar PayPal SDK');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return { loaded, error };
};
