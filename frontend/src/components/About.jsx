import React from "react";
import BlogProfileImage from "../assets/Blog Website Design.jpg";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="py-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 my-8">
        <div className="md:w-1/2">
          <span className="text-xs uppercase font-bold tracking-widest text-orange-500 bg-orange-100 px-3 py-1 rounded-full">
            Full Stack Developer
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
            Hi, I'm <span className="text-orange-500">Jacky Thomas</span>
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed text-base">
            I specialize in engineering full-stack web applications using the modern MERN stack 
            (MongoDB, Express.js, React, Node.js) styled with Tailwind CSS, along with Firebase Authentication 
            and scalable cloud services.
          </p>
          <p className="mt-2 text-gray-600 leading-relaxed text-base">
            I love crafting responsive user interfaces, designing clean database schemas, and writing insightful tech blogs 
            sharing my experiences and learning journey in full stack development.
          </p>

          <div className="flex gap-4 mt-6">
            <Link to="/blogs" className="button-style text-sm">
              Explore Tech Blogs
            </Link>
            <a
              href="#skills"
              className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              View Skills
            </a>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl blur-lg opacity-40"></div>
            <img
              src={BlogProfileImage}
              alt="Jacky Thomas Portfolio Portrait"
              className="relative w-72 md:w-80 rounded-xl shadow-xl border-4 border-white object-cover"
            />
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <section id="skills" className="my-16 bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Technical <span className="text-orange-500">Expertise</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl mb-4">
              ⚛️
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Frontend Development</h3>
            <p className="text-sm text-gray-500 mb-4">
              Building dynamic, accessible, and ultra-responsive SPAs with modern React ecosystem.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">React 18</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">Tailwind CSS</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">JavaScript (ES6+)</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">React Router</span>
            </div>
          </div>

          {/* Backend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl mb-4">
              🚀
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Backend & APIs</h3>
            <p className="text-sm text-gray-500 mb-4">
              Designing RESTful microservices, token authorization, and middleware architecture.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">Node.js</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">Express.js</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">RESTful APIs</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">JWT & Auth</span>
            </div>
          </div>

          {/* Database & Cloud */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mb-4">
              🍃
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Database & Cloud</h3>
            <p className="text-sm text-gray-500 mb-4">
              Data modeling, indexing, query optimization, and secure Firebase user authentication.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">MongoDB</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">Mongoose ODM</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">Firebase Auth</span>
              <span className="px-2.5 py-1 text-xs rounded bg-gray-100 text-gray-700 font-medium">Git & CI/CD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center my-12">
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-4xl font-black text-orange-500">6+</p>
          <p className="text-xs uppercase font-bold text-gray-400 mt-1">Live Projects</p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-4xl font-black text-green-500">100%</p>
          <p className="text-xs uppercase font-bold text-gray-400 mt-1">Client Satisfaction</p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-4xl font-black text-purple-500">4+</p>
          <p className="text-xs uppercase font-bold text-gray-400 mt-1">Published Articles</p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-4xl font-black text-blue-500">24/7</p>
          <p className="text-xs uppercase font-bold text-gray-400 mt-1">Agile Availability</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
