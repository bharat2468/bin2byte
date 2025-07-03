import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema(
	{
		address: {
			type: String,
			required: true,
			trim: true,
		},
		pincode: {
			type: String,
			required: true,
			trim: true,
		},
		state: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		organization: {
			type: String,
			trim: true,
		},
		photo: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			trim: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		owner: {
			type: Schema.Types.Mixed,
			required: true,
		},
		location: {
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

foodSchema.index({ location: "2dsphere" });

export const Food = mongoose.model("Food", foodSchema);
