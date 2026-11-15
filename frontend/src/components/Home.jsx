import React from 'react';
import BlogProfileImage from "../assets/Blog Website Design.jpg";
import CSS from "../assets/css-3.png";
import HTML from "../assets/html.png";
import DB from "../assets/data-server.png";
import JS from "../assets/js.png";
import REACTICON from "../assets/physics.png";
import NODE from "../assets/node-js.png";
import P1 from "../assets/p1.jpg";
import P2 from "../assets/p2.png";
import P3 from "../assets/p3.png";
import BlogImage from "../assets/blogImage.png";
import { useNavigate } from 'react-router-dom';
import Footer from './common/Footer';

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            {/* Hero Section */}
            <div className='flex items-center justify-between py-12 flex-col-reverse sm:flex-row gap-8'>
                <div className="w-full sm:w-1/2 flex flex-col justify-center">
                    <span className="text-sm uppercase tracking-widest font-semibold text-orange-500 mb-2">Full Stack Portfolio</span>
                    <h2 className='text-3xl md:text-6xl font-bold pb-2'>Hy! I Am</h2>
                    <h2 className='text-4xl md:text-7xl font-bold text-orange-400 py-2'>Jacky Thomas</h2>
                    <img src={BlogProfileImage} className='w-60 block sm:hidden rounded-lg shadow-md my-4' alt="Jacky Thomas portrait" />
                    <p className='py-2 text-gray-600 text-base'>
                        I create stunning, high-performance web applications using the modern MERN stack with Tailwind CSS and secure cloud integrations. Check out my projects and technical blogs below!
                    </p>
                    <div className="flex gap-4 mt-4">
                        <button className='button-style' onClick={() => navigate("/blogs")}>Explore Blogs</button>
                        <button className='px-6 py-2.5 rounded-md border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition' onClick={() => navigate("/about")}>About Me</button>
                    </div>
                </div>
                <div className='justify-center hidden sm:block'>
                    <img src={BlogProfileImage} className='w-72 md:w-96 rounded-2xl shadow-xl border-4 border-white object-cover' alt="Jacky Thomas portrait" />
                </div>
            </div>

            {/* Tech Stack Bar */}
            <div className='bg-gray-50 rounded-xl p-6 border border-gray-100 my-8'>
                <p className='text-center text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4'>Core Technologies & Tools</p>
                <div className='flex justify-evenly items-center flex-wrap gap-6'>
                    <div className="flex flex-col items-center gap-1">
                        <img src={HTML} style={{ width: "45px" }} alt="HTML5" />
                        <span className="text-xs text-gray-500 font-medium">HTML5</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <img src={CSS} style={{ width: "45px" }} alt="CSS3" />
                        <span className="text-xs text-gray-500 font-medium">CSS3</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <img src={JS} style={{ width: "45px" }} alt="JavaScript" />
                        <span className="text-xs text-gray-500 font-medium">JavaScript</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <img src={REACTICON} style={{ width: "45px" }} alt="React" />
                        <span className="text-xs text-gray-500 font-medium">React</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <img src={NODE} style={{ width: "45px" }} alt="Node.js" />
                        <span className="text-xs text-gray-500 font-medium">Node.js</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <img src={DB} style={{ width: "45px" }} alt="MongoDB" />
                        <span className="text-xs text-gray-500 font-medium">MongoDB</span>
                    </div>
                </div>
            </div>

            {/* Experience / Services Section */}
            <div className='flex flex-col mt-10 items-center justify-around sm:flex-row py-8'>
                <div className='flex-col'>
                    <div className='mt-4 border-[6px] rounded-lg border-purple-500 p-5 border-t-0 w-60 flex-col items-center'>
                        <div className='rounded-full border-2 p-5 font-bold text-white text-center bg-gradient-to-br from-purple-200 to-purple-600'>6+</div>
                        <p className='text-center font-medium mt-2'>Projects Completed</p>
                    </div>
                    <div className='mt-4 border-[6px] rounded-lg border-green-500 p-5 border-t-0 w-60 flex-col items-center'>
                        <div className='rounded-full border-2 p-5 font-bold text-white text-center bg-gradient-to-br from-green-200 to-green-600'>12+</div>
                        <p className='text-center font-medium mt-2'>Months of Experience</p>
                    </div>
                </div>

                <div className='ml-4 mt-6 sm:mt-0 max-w-lg'>
                    <h2 className='text-3xl sm:text-6xl font-bold'>My Awesome</h2>
                    <h2 className='text-3xl sm:text-6xl font-bold text-orange-400'>Services</h2>
                    <p className='my-3 text-gray-600 leading-relaxed'>
                        Full-stack web application development, responsive frontend engineering with Tailwind CSS, RESTful API design with Express & MongoDB, and secure authentication workflows with Firebase.
                    </p>
                    <button className='button-style mt-2' onClick={() => navigate("/about")}>View Experience</button>
                </div>
            </div>

            {/* Live Projects Section */}
            <div className="py-12">
                <h2 className='text-center text-4xl sm:text-5xl my-10 font-bold'>
                    Checkout My Live <span className='text-orange-400'>Projects</span>
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 my-5'>
                    <div className="overflow-hidden rounded-xl shadow-md border hover:shadow-lg transition">
                        <img src={P1} className='w-full h-48 object-cover cursor-pointer hover:scale-105 transition duration-300' alt="E-Commerce Full Stack Application" />
                        <div className="p-4 bg-white">
                            <h4 className="font-bold text-gray-800">E-Commerce Application</h4>
                            <p className="text-xs text-gray-500 mt-1">Full stack store with payment gateway and inventory management.</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl shadow-md border hover:shadow-lg transition">
                        <img src={P2} className='w-full h-48 object-cover cursor-pointer hover:scale-105 transition duration-300' alt="Realtime Collaboration Platform" />
                        <div className="p-4 bg-white">
                            <h4 className="font-bold text-gray-800">Realtime Workspace</h4>
                            <p className="text-xs text-gray-500 mt-1">Collaborative team task management with live updates.</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl shadow-md border hover:shadow-lg transition">
                        <img src={P3} className='w-full h-48 object-cover cursor-pointer hover:scale-105 transition duration-300' alt="Interactive Data Analytics Dashboard" />
                        <div className="p-4 bg-white">
                            <h4 className="font-bold text-gray-800">Analytics Dashboard</h4>
                            <p className="text-xs text-gray-500 mt-1">Interactive data visualization and business metrics tracker.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog CTA Section */}
            <div className='flex items-center justify-between my-14 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 flex-col sm:flex-row gap-6'>
                <div className='justify-center hidden sm:block'>
                    <img src={BlogImage} className='w-60 md:w-80 rounded-xl shadow-md' alt="Tech blog illustration" />
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-wider font-bold text-orange-600 mb-1">Knowledge Sharing</span>
                    <h2 className='text-3xl md:text-5xl font-bold pb-2 text-gray-900'>I like to Write</h2>
                    <h2 className='text-3xl md:text-5xl font-bold text-orange-500 py-1'>Blogs about Tech</h2>
                    <p className='py-2 text-gray-600 leading-relaxed text-sm'>
                        Explore articles covering MERN stack architecture, Tailwind CSS tricks, MongoDB database optimization, and Firebase authentication tips.
                    </p>
                    <button className='button-style mt-3 self-start' onClick={() => navigate("/blogs")}>Read My Blogs</button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
