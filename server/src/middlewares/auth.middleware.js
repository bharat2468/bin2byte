import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
	try {
		const token =
			req.cookies.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new ApiError(401, "Unauthorized request");
		}

		try {
			const decodedUser = jwt.verify(
				token,
				process.env.ACCESS_TOKEN_SECRET
			);
			const user = await User.findById(decodedUser._id).select(
				"-password -refreshToken"
			);

			if (!user) {
				throw new ApiError(401, "Invalid Access Token");
			}

			req.user = user;
			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				throw new ApiError(401, "JWT expired");
			}
			throw error;
		}
	} catch (error) {
		next(new ApiError(401, error?.message || "Invalid access token"));
	}
});
