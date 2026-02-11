import React from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ScrollablePreviewProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

export function ScrollablePreview({ imageSrc, alt, className = '' }: ScrollablePreviewProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden group ${className}`}>
      {/* 
        The container is absolute to fill the parent card.
        The inner div holds the image and animates.
      */}
      <style jsx>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          45% { transform: translateY(calc(-100% + 300px)); } /* Scroll to bottom leaving some visibility */
          55% { transform: translateY(calc(-100% + 300px)); } /* Pause at bottom */
          100% { transform: translateY(0); } /* Return to top */
        }
        .scroll-container:hover .scroll-image {
           animation: scroll-vertical 8s ease-in-out infinite alternate;
        }
      `}</style>
      
      <div className="absolute inset-0 bg-neutral-100">
         <div className="scroll-container w-full h-full">
            <div className="scroll-image w-full transition-transform duration-700 ease-out">
               <ImageWithFallback 
                 src={imageSrc} 
                 alt={alt} 
                 className="w-full h-auto block"
               />
            </div>
         </div>
         
         {/* Overlay gradient to hint at more content if not hovering */}
         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/5 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity" />
      </div>
    </div>
  );
}
