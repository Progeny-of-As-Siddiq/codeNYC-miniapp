'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: 'small' | 'medium' | 'big';
  delay: number;
}

interface Comet {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const starArray: Star[] = [];
      const numberOfStars = 50; // Adjust number of stars as needed
      
      for (let i = 0; i < numberOfStars; i++) {
        const sizes: ('small' | 'medium' | 'big')[] = ['small', 'small', 'small', 'medium', 'big'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        
        starArray.push({
          id: i,
          x: Math.random() * 100, // Random position as percentage
          y: Math.random() * 50, // Top 50% of screen
          size: randomSize,
          delay: Math.random() * 5, // Random animation delay
        });
      }
      setStars(starArray);
    };

    // Generate random comets
    const generateComets = () => {
      const cometArray: Comet[] = [];
      const numberOfComets = 5; // Fewer comets than stars
      
      for (let i = 0; i < numberOfComets; i++) {
        cometArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 50, // Top 50% of screen
          delay: Math.random() * 50, // Random delay for comet animation
        });
      }
      setComets(cometArray);
    };

    generateStars();
    generateComets();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Render Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`star ${star.size === 'medium' ? 'star--medium' : star.size === 'big' ? 'star--big' : ''}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Render Comets */}
      {comets.map((comet) => (
        <div
          key={`comet-${comet.id}`}
          className="comet"
          style={{
            left: `${comet.x}%`,
            top: `${comet.y}%`,
            animationDelay: `${comet.delay}s`,
          }}
        />
      ))}
    </div>
  );
} 