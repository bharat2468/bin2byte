import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import Container from "./Container";
import { useSelector } from "react-redux";
import { HeroImage, LogoImage } from "../../public"; // Ensure both are in public folder or imported as assets
import { Services } from "./";

const Hero = () => {
	const theme = useSelector((state) => state.ui.theme);
	const backgroundImage = HeroImage;

	return (
		<>
			<section
				className="w-screen h-screen bg-cover bg-center relative"
				style={{ backgroundImage: `url(${backgroundImage})` }}
			>
				{/* Overlay */}
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r dark:from-base-100/90 light:from-base-100/70 via-base-100/80 to-transparent z-1" />

				<Container className="relative z-10 flex items-center h-full px-6 md:px-12">
					<div className="max-w-2xl text-left space-y-6">
						{/* ✅ Logo on top */}
						<img
							src={LogoImage}
							alt="Bin2Byte Logo"
							className="h-24 sm:h-14 md:h-16 mb-2"
						/>

						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-primary-foreground drop-shadow-sm">
							Share Food. Spread Joy.
						</h1>

						<p className="text-lg sm:text-xl text-primary-foreground/90 drop-shadow-sm">
							Welcome to <span className="font-semibold text-primary">bin2byte</span> — where we turn leftovers into lifelines.
							Post your extra meals or find free food near you.
						</p>

						
					</div>
				</Container>
			</section>

			<Services />
		</>
	);
};

export default Hero;
