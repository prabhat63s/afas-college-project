import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiSolidHome, BiLogoGmail, BiSolidMap, BiSolidPhone, BiSolidInfoCircle, BiSolidContact, BiCartAlt } from "react-icons/bi";


const links = [ 
    {
      id: 1,
      link: "/",
      icon: <BiSolidHome size={24} />,
      title: "होम",
    },
    {
      id: 2,
      link: "/about",
      icon: <BiSolidInfoCircle size={24} />,
      title: "बारे में",
    },
    {
      id: 3,
      link: "/contact",
      icon: <BiSolidContact size={24} />,
      title: "संपर्क करें",
    },
    {
      id: 4,
      link: "http://localhost:3000/",
      target: "_blank",
      icon: <BiCartAlt size={24} />,
      title: "दुकान",
    }
    
  ];

const company = [
    {
      id: 1,
      to: "/",
      title: "संपर्क",
    },
    {
      id: 2,
      to: "/",
      title: "टीम",
    },
  ];

  const contact = [
    {
      id: 1,
      to: "/",
      title: "सहायता एवं समर्थन",
    },
    {
      id: 2,
      to: "/",
      title: "भागीदारों",
    },
  ];

  const legal = [
    {
      id: 1,
      to: "/",
      title: "नियम व शर्त",
    },
    {
      id: 2,
      to: "/",
      title: "गोपनीयता नीति ",
    },
  ];
  

  const social = [
    {
      id: 1,
      to: "/",
      title: <FaInstagram />,
    },
    {
      id: 2,
      to: "/",
      title: <FaYoutube />,
    },
    {
      id: 3,
      to: "/",
      title: <FaLinkedin />,
    },
    {
      id: 4,
      to: "/",
      title: <FaFacebook />,
    },
    {
      id: 5,
      to: "/",
      title: <FaTwitter />,
    },
  ];

  const details = [
    {
        id: 1,
        icon: <BiSolidMap />,
        title: "गोरखपुर, उत्तर प्रदेश"
    },
    {
        id: 2,
        icon: <BiLogoGmail />,
        title: "afas@gmail.com"
    },
    {
        id: 3,
        icon: <BiSolidPhone />,
        title: "+91 6386144016"
    },
  ]

export { links, company, contact, legal, social, details }