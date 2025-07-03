import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Loading } from "./index";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postFood } from "../api/food";
import { toast } from "react-toastify";

function DfoodForm() {
	const navigate = useNavigate();
	const [imagePreview, setImagePreview] = useState(null);
	const [geoError, setGeoError] = useState(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm({
		mode: "onTouched",
	});

	// Get user location
	useEffect(() => {
		if (typeof window !== "undefined" && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					setValue("latitude", pos.coords.latitude);
					setValue("longitude", pos.coords.longitude);
				},
				() => setGeoError("Geolocation permission denied.")
			);
		}
	}, [setValue]);

	const { mutate, isPending, isError, error } = useMutation({
		mutationFn: postFood,
		onSuccess: () => {
			toast.success("🎉 Food donation successful!");
			setTimeout(() => {
				navigate("/");
			}, 2000);
		},

		onError: () => {
			toast.error("❌ Submission failed. Try again.");
		},
	});

	const onSubmit = (data) => {
		const formData = new FormData();
		for (const key in data) {
			if (key === "photo") {
				formData.append("photo", data.photo[0]);
			} else {
				formData.append(key, data[key]);
			}
		}
		mutate(formData);
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="relative">
			{isPending && (
				<div className="absolute inset-0 z-10 bg-base-100 bg-opacity-80 flex items-center justify-center">
					<Loading className="w-16" />
				</div>
			)}

			<div className="max-w-3xl mx-auto px-4 py-8">
				<h2 className="text-center text-3xl font-bold mb-6">
					🍱 Donate Food
				</h2>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Title */}
					<Input
						label="Title"
						placeholder="Short title"
						{...register("title", {
							required: "Title is required",
							minLength: {
								value: 3,
								message: "Title must be at least 3 characters",
							},
						})}
					/>
					{errors.title && (
						<p className="text-error text-sm">
							{errors.title.message}
						</p>
					)}

					{/* Description */}
					<Input
						label="Description"
						placeholder="Describe the food"
						{...register("description", {
							required: "Description is required",
							minLength: {
								value: 5,
								message:
									"Description must be at least 5 characters",
							},
						})}
					/>
					{errors.description && (
						<p className="text-error text-sm">
							{errors.description.message}
						</p>
					)}

					{/* Organization */}
					<Input
						label="Organization"
						placeholder="Enter organization name"
						{...register("organization", {
							required: "Organization is required",
						})}
					/>
					{errors.organization && (
						<p className="text-error text-sm">
							{errors.organization.message}
						</p>
					)}

					{/* City */}
					<Input
						label="City"
						placeholder="Enter city"
						{...register("city", { required: "City is required" })}
					/>
					{errors.city && (
						<p className="text-error text-sm">
							{errors.city.message}
						</p>
					)}

					{/* State */}
					<Input
						label="State"
						placeholder="Enter state"
						{...register("state", {
							required: "State is required",
						})}
					/>
					{errors.state && (
						<p className="text-error text-sm">
							{errors.state.message}
						</p>
					)}

					{/* Pincode */}
					<Input
						label="Pincode"
						type="number"
						placeholder="Enter pincode"
						{...register("pincode", {
							required: "Pincode is required",
							pattern: {
								value: /^\d{6}$/,
								message: "Enter a valid 6-digit pincode",
							},
						})}
					/>
					{errors.pincode && (
						<p className="text-error text-sm">
							{errors.pincode.message}
						</p>
					)}

					{/* Address */}
					<Input
						label="Address"
						placeholder="Full address"
						{...register("address", {
							required: "Address is required",
							minLength: {
								value: 5,
								message:
									"Address must be at least 5 characters",
							},
						})}
					/>
					{errors.address && (
						<p className="text-error text-sm">
							{errors.address.message}
						</p>
					)}

					{/* Photo */}
					<div>
						<label className="label font-medium">
							Upload Food Photo
						</label>
						<input
							type="file"
							accept="image/*"
							{...register("photo", {
								required: "Photo is required",
								validate: {
									isImage: (files) =>
										files?.[0]?.type.startsWith("image/") ||
										"Only image files allowed",
								},
							})}
							onChange={handleImageChange}
							className="file-input file-input-bordered w-full"
						/>
						{errors.photo && (
							<p className="text-error text-sm">
								{errors.photo.message}
							</p>
						)}
						{imagePreview && (
							<div className="mt-2">
								<img
									src={imagePreview}
									alt="Preview"
									className="w-full h-64 object-cover rounded-lg"
								/>
							</div>
						)}
					</div>

					{/* Coordinates */}
					<div className="grid grid-cols-2 gap-4">
						<Input
							label="Latitude"
							disabled
							{...register("latitude", { required: true })}
						/>
						<Input
							label="Longitude"
							disabled
							{...register("longitude", { required: true })}
						/>
					</div>

					{geoError && (
						<p className="text-warning text-sm">{geoError}</p>
					)}

					<button
						type="submit"
						className="btn btn-primary w-full"
						disabled={isPending}>
						{isPending ? "Submitting..." : "Donate Now"}
					</button>

					<p className="text-center text-sm mt-4">
						Need food?{" "}
						<Link
							to="/findFood"
							className="link link-primary underline">
							View available food
						</Link>
					</p>

					{isError && (
						<p className="text-error text-center mt-2 text-sm">
							{error?.response?.data?.message ||
								"An error occurred. Try again."}
						</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default DfoodForm;
