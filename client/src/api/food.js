import api from "./axiosConfig";

// POST: Donate Food (Requires authentication)
const postFood = async (data) => {
	return await api.post("/food/postfood", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

// api/food.js
const getFood = async ({ latitude, longitude, setDistance }) => {
	return await api.get("/food/getfood", {
		params: { latitude, longitude, setDistance },
	});
};


export { postFood, getFood };
