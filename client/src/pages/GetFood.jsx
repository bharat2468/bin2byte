import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Map, PlacesList, Container } from "../components";
import { getFood } from "../api/food";

const GetFood = () => {
	const [coords, setCoords] = useState(null);
	const [sliderValue, setSliderValue] = useState(20);

	// Geolocation fetch once
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) =>
					setCoords({
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude,
					}),
				() => toast.error("Unable to fetch location")
			);
		}
	}, []);

	// Query key depends on coords + sliderValue (radius)
	const {
		data : response,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["nearbyFood", coords, sliderValue],
		queryFn: () =>
			getFood({
				latitude: coords.latitude,
				longitude: coords.longitude,
				setDistance: sliderValue,
			}),
		enabled: !!coords, // only run if coords are set
		retry: false,
	});
	console.log(response);
	const data = response?.data?.data;
	

	return (
		<Container className="min-h-screen flex flex-col items-center justify-center">
			<div className="container text-center">
				<h1 className="text-4xl md:text-5xl font-bold my-8">
					Delicious <span className="text-green-600">Delights</span>
				</h1>
				<p className="mb-6">
					Embark on a Culinary Adventure: Discover and Order the Most
					Delectable Food Experiences Near You!
				</p>

				<div className="flex justify-center items-center gap-4 mb-4">
					<label className="font-semibold">Radius (km):</label>
					<input
						type="range"
						min="1"
						max="2000"
						value={sliderValue}
						onChange={(e) =>
							setSliderValue(parseInt(e.target.value))
						}
					/>
					<span className="font-semibold">{sliderValue} km</span>
				</div>

				{isLoading && <p className="text-primary">Loading nearby food...</p>}
				{isError && (
					<p className="text-error">
						{error?.message || "Failed to fetch food data"}
					</p>
				)}

				{data && coords && (
					<>
						<Map
							data={data}
							center={{ lat: coords.latitude, lng: coords.longitude }}
							zoom={10}
						/>
						<PlacesList data={data} />
					</>
				)}
			</div>
		</Container>
	);
};

export default GetFood;
