import React from "react";
import Head from "next/head";
import ProjectShowcaseInfinity from "./Components/ProjectShowcase";

export default function Page() {


  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Our Projects | Sazin construction Ltd</title>
        <meta
          name="description"
          content="Explore our latest projects in web development, design, and technology. See case studies and portfolio highlights."
        />
        <meta
          name="keywords"
          content="projects, portfolio, web development, design, case studies"
        />
        <meta property="og:title" content="Our Projects | sazin construction ltd" />
        <meta
          property="og:description"
          content="Discover high-quality projects crafted by our expert team."
        />
        <meta property="og:image" content="/default-project-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sazin.com.bd/Projects" />
      </Head>


      {/* ✅ UI untouched */}
      <div>
        <ProjectShowcaseInfinity />
      </div>
    </>
  );
}
