    import React from 'react';
    import { FaStar, FaChalkboardTeacher, FaBriefcase, FaBook } from 'react-icons/fa';

    const OurSpecialties = () => {
    return (
        <div className="text-center  mt-16">
        <h2 className="text-3xl font-bold  uppercase text-blue-950 mb-4">Our Specialties</h2>
        

        <p className="text-gray-600 mb-8 md:px-60  ">
            At our learning platform, you have the opportunity to learn from expert instructors and gain valuable skills at your own pace. We stand out in various aspects that make your learning experience exceptional.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First Card - Quality */}
            <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer text-center">
            <div className="flex justify-center items-center text-3xl text-blue-600 mb-2">
            
                <FaStar />
            </div>
            <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
                Experience high-quality content and learning materials tailored to your educational journey. Our commitment to excellence ensures you receive the best.
            </p>
            </div>

            {/* Second Card - Skilled Teachers */}
            <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer text-center">
            <div className="flex justify-center items-center text-3xl text-blue-600 mb-2">

                <FaChalkboardTeacher />
            </div>
            <h3 className="text-lg font-semibold mb-2">Skilled Teachers</h3>
            <p className="text-gray-600">
                Learn from expert instructors with real-world experience and a passion for teaching. Their knowledge and dedication will guide your path to success.
            </p>
            </div>

            {/* Third Card - Quality Projects */}
            <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer text-center">
            <div className="flex justify-center items-center text-3xl text-blue-600 mb-2">
            
                <FaBriefcase />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Projects</h3>
            <p className="text-gray-600">
                Get hands-on experience with our industry-relevant projects. Apply what you learn in real-world scenarios and build your portfolio with confidence.
            </p>
            </div>

            {/* Fourth Card - Online Material */}
            <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer text-center">
            <div className="flex justify-center items-center text-3xl text-blue-600 mb-2">
                
                <FaBook />
            </div>
            <h3 className="text-lg font-semibold mb-2">Online Material</h3>
            <p className="text-gray-600">
                Access online resources and materials at your convenience, empowering you to learn anytime and anywhere. We're committed to making learning accessible.
            </p>
            </div>
        </div>
        </div>
    );
    };

    export default OurSpecialties;
