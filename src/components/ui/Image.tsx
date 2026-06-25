import type { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  quality?: number;
  format?: 'auto' | 'avif' | 'webp' | 'json';
}

/**
 * Componente de Imagen optimizado para Cloudflare Pages (Image Resizing).
 * En desarrollo, sirve la imagen original. En producción, reescribe la URL
 * para que el Edge CDN la optimice al vuelo (WebP/AVIF, resize, etc.).
 */
export default function Image({
  src,
  alt,
  width,
  height,
  quality = 80,
  format = 'auto',
  className = '',
  ...props
}: ImageProps) {
  // Solo aplicar cdn-cgi si es prod y la ruta es relativa (local)
  const isProd = import.meta.env.PROD;
  const isLocal = src.startsWith('/');

  let finalSrc = src;
  
  if (isProd && isLocal) {
    const params = [];
    params.push(`format=${format}`);
    params.push(`quality=${quality}`);
    if (width) params.push(`width=${width}`);
    if (height) params.push(`height=${height}`);
    
    finalSrc = `/cdn-cgi/image/${params.join(',')}${src}`;
  }

  return (
    <img
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      loading={props.loading || 'lazy'}
      decoding="async"
      className={className}
      {...props}
    />
  );
}
