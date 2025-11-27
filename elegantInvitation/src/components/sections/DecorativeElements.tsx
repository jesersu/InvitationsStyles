import React from 'react';

interface DecorativeElement {
  id: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: 'sm' | 'md' | 'lg';
  color: string;
  animation: 'shimmer' | 'pulse' | 'float';
  delay?: string;
}

interface DecorativeElementsProps {
  elements: DecorativeElement[];
}

const sizeMap = {
  sm: 'w-1 h-1 md:w-1.5 md:h-1.5',
  md: 'w-2 h-2 md:w-3 md:h-3',
  lg: 'w-3 h-3 md:w-4 md:h-4',
};

export const DecorativeElements: React.FC<DecorativeElementsProps> = ({ elements }) => {
  return (
    <>
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute rounded-full ${sizeMap[element.size]} ${element.color} animate-${element.animation}`}
          style={{
            top: element.top,
            bottom: element.bottom,
            left: element.left,
            right: element.right,
            animationDelay: element.delay,
          }}
        />
      ))}
    </>
  );
};
