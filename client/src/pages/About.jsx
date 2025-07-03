import React from "react";
import { Container, About as AboutComponent } from "../components";

const About = () => {
	return (
		<Container>
			<AboutComponent className="w-1/2 mx-auto" />
		</Container>
	);
};

export default About;
