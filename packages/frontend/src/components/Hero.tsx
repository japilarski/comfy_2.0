import React from 'react';

import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero3.webp';
import hero3 from '../assets/hero2.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

export const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm: text-6xl">Sklep Meblowy Piotr Pilarski Rypin</h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-justify">
          Jesteśmy rodzinną firmą działającą w Rypinie od ponad 20 lat! Serdecznie zapraszamy do naszego stacjonarnego
          sklepu znajdujące się przy przy na ulicy Dworcowej w Rypinie. Oferujemy największy wybór mebli w mieście i
          okolicach.
        </p>
      </div>
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img src={image} className="rounded-box h-full w-80 object-cover" alt={image}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};
