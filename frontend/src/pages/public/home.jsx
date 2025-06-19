import React from "react";
import HeroSection from "../../components/public/home/HeroSection.jsx";
import BrandsSection from "../../components/public/home/BrandsSection.jsx";
import ServicesSection from "../../components/public/home/ServicesSection.jsx";
import PromoSection from "../../components/public/home/PromoSection.jsx";
import FeaturedVehicles from "../../components/public/home/FeaturedSection.jsx";
import CarroGris2 from "./img/CarroGrisHome2.jpg";
import NissanLogo from "./img/Nissan.png";
import HondaLogo from "./img/Honda.png";
import ToyotaLogo from "./img/Toyota.png";
import LexusLogo from "./img/Lexus.png";
import MitsubishiLogo from "./img/mitsubishi.png";
import QashqaiImg from "./img/qashqai.png";
import PathfinderImg from "./img/pathfinder.png";
import CivicTypeRImg from "./img/civic-type-r.png";
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
      
      <PromoSection/>

      
      <FeaturedVehicles vehicles={featuredVehicles} />
    </div>
  );
}