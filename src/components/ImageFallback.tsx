import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageFallbackProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

const ImageFallback = ({ src, alt, className, imgClassName }: ImageFallbackProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-amber-700/30 border-t-amber-700 rounded-full animate-spin" />
        </div>
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover',
            'transition-opacity duration-500',
            isLoading ? 'opacity-0' : 'opacity-100',
            imgClassName
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      ) : (
        <div
          className={cn(
            'w-full h-full flex flex-col items-center justify-center',
            'bg-gradient-to-br from-stone-100 to-stone-200',
            'border border-stone-300'
          )}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A3728' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <ImageOff className="w-12 h-12 text-stone-400 relative z-10" />
          <p className="mt-3 text-sm text-stone-500 font-serif relative z-10">图片加载失败</p>
          <p className="mt-1 text-xs text-stone-400 relative z-10">{alt}</p>
        </div>
      )}
    </div>
  );
};

export default ImageFallback;
