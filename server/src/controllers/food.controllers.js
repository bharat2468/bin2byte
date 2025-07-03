import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Food } from "../models/food.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// @desc    Create a new food entry
const postFood = asyncHandler(async (req, res) => {
	const {
		address,
		pincode,
		state,
		city,
		organization,
		description,
		title,
		latitude,
		longitude,
	} = req.body;

	const localFilePath = req?.file?.path;

	if (!localFilePath) {
		throw new ApiError(400, "Photo is required");
	}

	const cloudinaryRes = await uploadOnCloudinary(localFilePath);
	const imageUrl = cloudinaryRes?.url;

	if (!imageUrl) {
		throw new ApiError(500, "Image upload to Cloudinary failed");
	}

	// Check if title already exists (optional)
	const existing = await Food.findOne({ title });
	if (existing) {
		throw new ApiError(400, "A food post with this title already exists");
	}

	const food = await Food.create({
		address,
		pincode,
		state,
		city,
		organization,
		description,
		title,
		photo: imageUrl,
		owner: req.user, // from verifyJWT
		location: {
			type: "Point",
			coordinates: [parseFloat(longitude), parseFloat(latitude)],
		},
	});

	return res
		.status(201)
		.json(new ApiResponse(201, food, "Food post created successfully"));
});

// @desc    Get nearby food based on coordinates and radius
const getFood = asyncHandler(async (req, res) => {
	const { latitude, longitude, setDistance } = req.query;

	if (!latitude || !longitude || !setDistance) {
		throw new ApiError(
			400,
			"Latitude, longitude and distance are required"
		);
	}

	const results = await Food.aggregate([
		{
			$geoNear: {
				near: {
					type: "Point",
					coordinates: [parseFloat(longitude), parseFloat(latitude)],
				},
				distanceField: "dist.calculated",
				maxDistance: parseFloat(setDistance) * 1000, // in meters
				spherical: true,
			},
		},
	]);

	return res
		.status(200)
		.json(
			new ApiResponse(200, results, "Nearby food fetched successfully")
		);
});

export { postFood, getFood };
