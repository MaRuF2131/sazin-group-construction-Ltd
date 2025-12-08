"use client";

import Hero from "./components/Hero";
import SummaryCards from "./components/SummaryCards";
import Fisheries from "./components/Fisheries";
import Agriculture from "./components/Agriculture";
import Orchards from "./components/Orchards";
import Facilities from "./components/Facilities";
import Gallery from "./components/Gallery";
import AgroStats from "./components/AgroStats";
import FuturePlans from "./components/FuturePlans";
import About from "./components/About";


// central data object
export const agroData = {
  name: "Sazin Agro & Fisheries",
  ponds: 11,
  pondArea: "≈ 80 Bigha",
  agriLand: "≈ 75 Bigha",
  mangoTrees: 1100,
  lemonTrees: 500,
  bananaTrees: "500–600",
  heroImage:
    "/Agrooo.png",
  gallery: [
    "/pont1.jpeg",
    "/pont2.jpeg",
    "/pont3.jpeg",
    "/agro1.jpeg",
    "/pont4.jpeg",
    "/agro2.jpeg",
    "/agro3.jpeg",
    "/pont5.jpeg",
    "/pont6.jpeg",
  ],
  addressLine: "WF2H+M49, Unnamed Road",
  phone: "02-58810754",
  email: "sazin.engineering@gmail.com",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=DOHS%20Mohakhali,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50">
      <Hero data={agroData} />
      <SummaryCards data={agroData} />
      <About/>
      <Fisheries data={agroData} />
      <Agriculture data={agroData} />
      <Orchards data={agroData} />
      <Facilities data={agroData} />
      <Gallery data={agroData} />
      <AgroStats data={agroData} />
      <FuturePlans />
    </div>
  );
}