import { Container } from "./";
import { Link } from "react-router-dom";

const Services = () => {
	const data = [
		{
			url: "https://www.henryford.com/-/media/project/hfhs/henryford/henry-ford-blog/images/mobile-interior-banner-images/2020/06/food-bank-what-to-give.jpg?h=600&iar=0&w=640&rev=4eef8c0563754a7bb81c39c35b6867f7&hash=DBAA3EA1546CBC38CC79A3FC6B8AF87F",
			text: "Help combat hunger by donating surplus food. Your contribution can make a significant impact in providing meals to those who need it most.",
			heading: "Donate Food",
			btn: "Donate Food",
			link: "/donateFood",
		},
		{
			url: "https://www.eatthis.com/wp-content/uploads/sites/4/2020/04/takeout-food.jpg?quality=82&strip=1",
			text: "Access nutritious meals through our platform. Whether facing food insecurity or seeking assistance, we're here to support you.",
			heading: "Take Food",
			btn: "Get Food",
			link: "/findFood",
		},
	];

	return (
		<Container className="py-12 md:py-20">
			<h1 className="text-4xl md:text-6xl font-bold text-center text-primary mb-12">
				Our Services
			</h1>

			<div className="grid gap-10 md:grid-cols-2 px-4">
				{data.map((item) => (
					<div
						key={item.url}
						className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 border border-base-200"
					>
						<figure className="h-64 overflow-hidden">
							<img
								src={item.url}
								alt={item.heading}
								className="object-cover transition-transform duration-300 hover:scale-105"
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-2xl text-primary">
								{item.heading}
							</h2>
							<p className="text-base text-base-content/80">
								{item.text}
							</p>
							<div className="card-actions mt-4">
								<Link to={item.link} className="btn btn-primary btn-md">
									{item.btn}
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};

export default Services;
