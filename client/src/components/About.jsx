import React from "react";
import { FaUtensils, FaMapMarkedAlt, FaHandsHelping } from "react-icons/fa";

const About = () => {
	return (
		<div className="min-h-screen py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-base-100 text-base-content">
			<div className="max-w-4xl mx-auto text-center space-y-8">
				<h1 className="text-4xl font-bold text-primary">About Us</h1>
				<p className="text-lg leading-relaxed">
					<span className="font-semibold text-primary">FoodShare</span> is a platform built
					with a mission to reduce food waste and hunger by connecting people
					with extra food to those who need it.
				</p>
			</div>

			<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				<div className="card bg-base-200 shadow-xl shadow-gray-700">
					<div className="card-body items-center text-center">
						<FaUtensils className="text-4xl text-primary mb-4" />
						<h2 className="card-title">Post Food</h2>
						<p>Have extra food? Post the details with location and let someone in need find it.</p>
					</div>
				</div>

				<div className="card bg-base-200 shadow-xl shadow-gray-700">
					<div className="card-body items-center text-center ">
						<FaMapMarkedAlt className="text-4xl text-primary mb-4" />
						<h2 className="card-title">Find Nearby</h2>
						<p>Discover free food near you using our interactive map and distance filter.</p>
					</div>
				</div>

				<div className="card bg-base-200 shadow-xl shadow-gray-700">
					<div className="card-body items-center text-center">
						<FaHandsHelping className="text-4xl text-primary mb-4" />
						<h2 className="card-title">Build Community</h2>
						<p>Be part of a caring community that shares, supports, and uplifts each other.</p>
					</div>
				</div>
			</div>

			<div className="mt-16 max-w-3xl mx-auto text-center space-y-6">
				<h3 className="text-2xl font-semibold text-primary">Why We Exist</h3>
				<p>
					Millions of meals are wasted daily while people go hungry. We believe technology
					can bridge this gap. By encouraging food sharing, we aim to promote sustainability,
					kindness, and community care.
				</p>
				<p className="text-primary font-medium">
					Join us in making a difference — one meal at a time.
				</p>
			</div>
		</div>
	);
};

export default About;
