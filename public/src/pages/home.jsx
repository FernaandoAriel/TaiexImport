import React from "react";
import HeroSection from "../components/home/HeroSection.jsx";
import BrandsSection from "../components/home/BrandsSection.jsx";
import ServicesSection from "../components/home/ServicesSection.jsx";
import PromoSection from "../components/home/PromoSection.jsx";
import FeaturedVehicles from "../components/home/FeaturedSection.jsx";
import CarroGris2 from "../pages/img/CarroGrisHome2.jpg";
import CarroNaranja from "../pages/img/CarroNaranjaHome.jpg";
import NissanLogo from "../pages/img/Nissan.png";
import HondaLogo from "../pages/img/Honda.png";
import ToyotaLogo from "../pages/img/Toyota.png";
import LexusLogo from "../pages/img/Lexus.png";
import MitsubishiLogo from "../pages/img/mitsubishi.png";
import QashqaiImg from "../pages/img/qashqai.png";
import PathfinderImg from "../pages/img/pathfinder.png";
import CivicTypeRImg from "../pages/img/civic-type-r.png";
import "./css/home.css";

export default function Home() {
  const brands = [
    { id: 1, name: "Nissan", logo: NissanLogo },
    { id: 2, name: "Honda", logo: HondaLogo },
    { id: 3, name: "Toyota", logo: ToyotaLogo },
    { id: 4, name: "Lexus", logo: LexusLogo },
    { id: 5, name: "Mitsubishi", logo: MitsubishiLogo },
  ];

  const featuredVehicles = [
    {
      id: 1,
      name: "QASHQAI",
      image: QashqaiImg,
      description: "Sunroof | Cuatro puertas",
    },
    {
      id: 2,
      name: "PATHFINDER",
      image: PathfinderImg,
      description: "Elegante | Robusto | Confortable",
    },
    {
      id: 3,
      name: "Civic Type R 2024",
      image: CivicTypeRImg,
      description: "Elegante | Rápido | Deportivo",
    },
  ];

  return (
    <div className="home-container">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      ></meta>
      
      <HeroSection backgroundImage={CarroGris2} />
      
      <BrandsSection brands={brands} />
      
      <ServicesSection />
      
      <PromoSection
        image={CarroNaranja}
        title="Descubre el Honda Civic 2024"
        description="El coche más innovador con prestaciones de primer nivel y características de alto rendimiento."
      />
      
      <FeaturedVehicles vehicles={featuredVehicles} />
    </div>
  );
}