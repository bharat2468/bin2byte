import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const Card = ({ card_detail }) => {
	const [isHovered, setIsHovered] = useState(false);

	const springProps = useSpring({
		transform: isHovered
			? "translateY(0px) scale(1.05)"
			: "translateY(-10px) scale(1)",
		config: { tension: 300, friction: 20 },
	});

	return (
		<animated.div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={springProps}>
			<div className="card w-96 bg-base-100 shadow-xl rounded-xl shadow-gray-700">
				<figure>
					<img
						src={card_detail.url}
						alt="Card Image"
						className="object-cover object-bottom h-60 w-full rounded-t-xl"
					/>
				</figure>
				<div className="card-body pb-6">
					<h2 className="card-title text-2xl font-bold text-gray-900 dark:text-white">
						{card_detail.heading}
					</h2>
					<p className="text-gray-700 dark:text-gray-400 my-2">
						{card_detail.text}
					</p>
					<div className="card-actions justify-end">
						<Link to={card_detail.link} className="btn btn-success">
							{card_detail.btn}
						</Link>
					</div>
				</div>
			</div>
		</animated.div>
	);
};

export default Card;
