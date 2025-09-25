import React from 'react'
import CategoryCard from '../../../../components/CategoryCard';
const Category = () => {
const subCategories = [
    {
      title: "Full Face",
      image:
        "/fullface.jpg",

        path:'/Product-Base-Services/Sky-Helmet&Safety-Accessories/Full-Face',
        id:1
    },
    {
      title: "Modular Face",
      image:
        "/modulerface.jpg",
        path:'/Product-Base-Services/Sky-Helmet&Safety-Accessories/Modular-Face',
        id:2
    },
    {
      title: "Open Face",
      image:
        "/openface.jpg",
        path:'/Product-Base-Services/Sky-Helmet&Safety-Accessories/Open-Face',
        id:3
    },
    {
      title: "Half Face",
      image:
        "/halfface.jpg",
        path:'/Product-Base-Services/Sky-Helmet&Safety-Accessories/Half-Face',
        id:4
    },
      {
      title: "Welding Helmets & Gloves",
      image:
        "/halfface.jpg",
        path:'//Product-Base-Services/Safety-Accessories/Welding',
        id:5
    },
   
    {
      title: "Fall Protection Harness",
      image:
        "/halfface.jpg",
        path:'/Product-Base-Services/Safety-Accessories/Harness',
        id:6
    },
    {
      title: "Coveralls / Suits",
      image:
        "/fullface.jpg",

        path:'/Product-Base-Services/Safety-Accessories/Coverall',
        id:7
    },
    {
      title: "Respirators / Masks",
      image:
        "/modulerface.jpg",
        path:'/Product-Base-Services/Safety-Accessories/Masks',
        id:8
    },
    {
      title: "High-Visibility Safety Vests",
      image:
        "/openface.jpg",
        path:'/Product-Base-Services/Safety-Accessories/Vests',
        id:9
    },
    {
      title: "Safety Shoes / Gumboots",
      image:
        "/halfface.jpg",
        path:'/Product-Base-Services/Safety-Accessories/Shoes',
        id:10
    },
      {
      title: "Safety Gloves",
      image:
        "/halfface.jpg",
        path:'/Product-Base-Services/Safety-Accessories/Gloves',
        id:11
    },
   
    {
      title: "Ear Plugs / Ear Muffs",
      image:
        "/halfface.jpg",
        path:'/Product-Base-Services/Safety-Accessories/Hearing-Protection',
        id:12
    },
      {
      title: "Safety Goggles / Face Shields",
      image:
        "/halfface.jpg",
        path:'/Product-Base-Services/Safety-Accessories/Goggles',
        id:13
    },
   
    {
      title: "Safety Helmets (Hard Hats)",
      image:
        "/halfface.jpg",
        path:'/Product-Base-Services/Safety-Accessories/Helmets',
        id:14
    },

  ];
 
  return (
    <div>
      <CategoryCard subCategories={subCategories}  />

    </div>
  )
}

export default Category
