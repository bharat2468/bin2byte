import { Logo } from "../";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-base-200 text-base-content px-4 md:px-10 py-10">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-28 text-center md:text-left">
				
				{/* Box 1: Logo */}
				<div className="flex flex-col items-center md:items-start gap-2">
					<Logo />
				</div>

				{/* Box 2: Follow Us */}
				<div className="flex flex-col items-center md:items-start gap-2">
					<h4 className="text-lg font-semibold">Follow Us</h4>
					<div className="flex gap-4">
						<a
							href="https://github.com/bharat2468"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							title="GitHub"
							className="hover:text-primary transition-colors"
						>
							<FaGithub size={24} />
						</a>
						<a
							href="https://www.linkedin.com/in/bharat-pinjani-439631270/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							title="LinkedIn"
							className="hover:text-primary transition-colors"
						>
							<FaLinkedin size={24} />
						</a>
					</div>
				</div>

				{/* Box 3: Empty for now */}
				<div></div>
			</div>

			{/* Copyright */}
			<div className="mt-10 text-center text-sm text-gray-500 border-t border-base-300 pt-4">
				<p>
					&copy; {new Date().getFullYear()}{" "}
					<span className="font-medium">bin2byte</span> — All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
