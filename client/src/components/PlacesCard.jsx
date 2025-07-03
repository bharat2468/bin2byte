import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { FaMapMarkerAlt, FaPhoneAlt, FaHome } from "react-icons/fa";

const PlacesCard = ({ card_detail }) => {
	const [isHovered, setIsHovered] = useState(false);

	const springProps = useSpring({
		transform: isHovered
			? "translateY(-4px) scale(1.02)"
			: "translateY(0px) scale(1)",
		boxShadow: isHovered
			? "0 8px 25px rgba(0,0,0,0.15)"
			: "0 4px 12px rgba(0,0,0,0.05)",
		config: { tension: 300, friction: 20 },
	});

	return (
		<animated.div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={springProps}
			className="max-w-sm w-full"
		>
			<div className="card bg-base-100 border border-base-300 shadow-md rounded-xl overflow-hidden dark:shadow-gray-500">
				<figure className="relative h-56 overflow-hidden">
					<img
						src={card_detail?.photo || "https://via.placeholder.com/300x200"}
						alt={card_detail?.title || "Food Image"}
						className="h-full w-full object-cover"
					/>
					<div className="absolute top-2 left-2 badge badge-accent badge-outline">
						{card_detail?.organization || "Bin2Byte"}
					</div>
				</figure>

				<div className="card-body px-5 py-4 space-y-2 text-left">
					<h2 className="card-title text-xl text-primary">
						{card_detail?.title || "Untitled Donation"}
					</h2>

					<p className="text-sm text-base-content/80">
						{card_detail?.description || "No description provided."}
					</p>

					<div className="text-sm flex items-start gap-2">
						<FaHome className="mt-1 text-primary" />
						<span>{card_detail?.address || "No address provided"}</span>
					</div>

					<div className="text-sm flex items-center gap-2">
						<FaMapMarkerAlt className="text-red-500" />
						<span>
							{card_detail?.city || "City"},{" "}
							{card_detail?.state || "State"} -{" "}
							{card_detail?.pincode || "000000"}
						</span>
					</div>
				</div>
			</div>
		</animated.div>
	);
};

export default PlacesCard;
