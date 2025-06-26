import React, { useState, useEffect } from 'react';

const AutoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos de ejemplo para las 4 imágenes
  const slides = [
    {
      id: 1,
      image: "./src/pages/public/img/CarroBlancoLexus.jpg",
      title: "2021 Lexus IS",
      link: ""
    },
    {
      id: 2,
      image: "./src/pages/public/img/CarrosNissan.jpg",
      title: "Nissan Sentra Nismo",
      link: ""
    },
    {
      id: 3,
      image: "./src/pages/public/img/HundaiCivic.jpg",
      title: "2012 Honda CR-Z Mugen ",
      link: ""
    },
    {
      id: 4,
      image: "./src/pages/public/img/ToyotaAvalon.jpg",
      title: "2020 Toyota Avalon TRD",
      link: ""
    }
  ];

  // Cambio automático de slide cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Barra de progreso */}
      <div className="absolute top-0 left-0 w-full h-2 bg-black/20 z-30">
        <div 
          className="h-full bg-red-600 transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        ></div>
      </div>

      {/* Contenedor de slides */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            <a href={slide.link} className="block w-full h-full relative group">
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
              
              </div>

              {/* Contenido de texto */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 z-20">
                <div className="mb-20">
                  <h1 className=" font-['Lato'] font-bold text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6 leading-none"
                  style={{color: '#ffffff'}}>
                    {slide.title}
                  </h1>
                  <div className="w-24 md:w-32 h-1 bg-red-600 mt-6 md:mt-8 rounded-full"></div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>


      {/* Estilos de fuente */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
      `}</style>
    </div>
  );
};

export default AutoCarousel;