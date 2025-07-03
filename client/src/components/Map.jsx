// components/Map.jsx
import React, { useCallback, useRef, useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import {pointer} from "../../public/index"; // Adjust the path if needed

const containerStyle = {
	width: "100%",
	height: "80vh",
};

const defaultCenter = {
	lat: 25.050030688239502,
	lng: 75.82734334044619,
};

const Map = ({
	data,
	center = defaultCenter,
	zoom = 5,
	markerIcon = pointer,
	onMarkerClick,
}) => {
	const mapRef = useRef(null);
	const infoWindowRef = useRef(null);

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
	});

	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const markers = useMemo(() => {
		return data
			.filter((obj) => obj?.location?.coordinates?.length >= 2)
			.map((obj) => ({
				lat: obj.location.coordinates[1],
				lng: obj.location.coordinates[0],
				title: obj.title || "Untitled",
			}));
	}, [data]);

	const handleMarkerClick = (marker) => {
		if (onMarkerClick) return onMarkerClick(marker);

		if (!infoWindowRef.current) {
			infoWindowRef.current = new window.google.maps.InfoWindow();
		}

		infoWindowRef.current.setContent(
			`<div><strong>${marker.title}</strong></div>`
		);
		infoWindowRef.current.setPosition({ lat: marker.lat, lng: marker.lng });
		infoWindowRef.current.open(mapRef.current);
	};

	if (loadError)
		return <p className="text-red-500 text-center">Error loading map</p>;
	if (!isLoaded) return <p className="text-center">Loading map...</p>;

	return (
		<div className="mt-10">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={zoom}
				onLoad={onMapLoad}>
				{markers.map((marker, index) => (
					<MarkerF
						key={index}
						position={{ lat: marker.lat, lng: marker.lng }}
						onClick={() => handleMarkerClick(marker)}
						icon={{
							url: markerIcon,
							scaledSize: new window.google.maps.Size(35, 35),
						}}
					/>
				))}
			</GoogleMap>
		</div>
	);
};

export default Map;
