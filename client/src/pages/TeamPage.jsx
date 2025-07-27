import React from "react";
// import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import vicky from "../assets/vicky.jpg";
import mohit from "../assets/mohit.jpg";
import prabhat from "../assets/prabhat.jpg";

const team = [
  {
    name: "Prabhat Singh",
    role: "Backend Developer",
    pic: prabhat,
    link: "https://prabhat-singh.vercel.app",
  },
  {
    name: "Mohit Gupta",
    role: "Frontend Developer",
    pic: mohit,
    link: "https://www.instagram.com/mohit_gupta.2003/",
  },
  {
    name: "Vishnu Shankar Sharma",
    role: "Backend Developer",
    pic: "",
    link: "https://www.instagram.com/vishnushankersharma836946/",
  },
  {
    name: "Surya Pratap Singh",
    role: "UI/Frontend Developer",
    pic: "",
    link: "https://www.instagram.com/1_sun_rays_1/",
  },
  {
    name: "Vicky Jaiswal",
    role: "Frontend Developer",
    pic: vicky,
    link: "https://www.instagram.com/vickyjaiswal8508/",
  },
];

export default function TeamPage() {
  return (
      <div className="lg:w-[85%] p-4 lg:p-0 mx-auto flex flex-col gap-4 mb-10">
        <h1 className=" text-2xl pl-4 lg:pl-0 mt-5 font-semibold text-neutral-800">
          Team
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-4">
          {team.map((t, index) => (
            <Link
              to={t.link}
              target="_blank"
              key={index}
              title="Go to profile"
              className="flex items-center flex-col space-y-4"
            >
              <img
                src={t.pic}
                alt=""
                className="w-56 h-56 lg:h-60 lg:w-60 rounded-full hover:shadow-xl"
              />
              <p className="text-lg font-semibold">{t.name}</p>
              <p className="">{t.role}</p>
            </Link>
          ))}
        </div>
      </div>
    // <Layout>
    // </Layout>
  );
}
