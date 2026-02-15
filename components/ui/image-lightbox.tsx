'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export function ImageLightbox({ src, alt, children }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Trigger — wraps the children */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in relative block w-full h-full group/lightbox"
      >
        {children}
        {/* Zoom hint overlay */}
        <span className="absolute inset-0 bg-black/0 group-hover/lightbox:bg-black/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
          <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover/lightbox:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
        </span>
      </button>

      {/* Modal rendered via portal to escape overflow:hidden parents */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image container */}
            <div
              className="relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              />
              {/* Caption */}
              <p className="text-center text-white/80 text-sm mt-4 font-medium">
                {alt}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
