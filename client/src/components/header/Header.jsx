import { Link, useNavigate } from "react-router-dom";
import { Container, Logo } from "../index";
import ThemeToggle from "./Themetoggle";
import { useSelector } from "react-redux";
import UserOptionsButton from "./UserOptionsButton";

function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	const user = useSelector((state) => state.auth.user);
	const isAdmin = user?.role === "admin";
	const navigate = useNavigate();

	const navItems = [
		{ name: "Home", slug: "/", active: true },
		{ name: "Admin Dashboard", slug: "/admin", active: authStatus && isAdmin },
		{ name: "Donate Food", slug: "/donateFood", active: authStatus },
		{ name: "Find Food", slug: "/findFood", active: authStatus },
		{ name: "About Us", slug: "/about", active: true },
	];

	const authButtons = [
		{ name: "Login", slug: "/login", active: !authStatus },
	];

	return (
		<header className="sticky top-0 z-50 bg-base-100">
			<Container>
				<div className="navbar">
					{/* Mobile Start */}
					<div className="navbar-start">
						<div className="dropdown">
							<label
								tabIndex={0}
								className="btn btn-ghost lg:hidden"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
							>
								{navItems.map(
									(item) =>
										item.active && (
											<li key={item.name}>
												<button
													onClick={() => navigate(item.slug)}
													className="btn btn-ghost justify-start w-full"
												>
													{item.name}
												</button>
											</li>
										)
								)}
								<li className="mt-2">
									<ThemeToggle />
								</li>
							</ul>
						</div>

						<Link to="/" className="btn btn-ghost normal-case text-xl">
							<Logo />
						</Link>
					</div>

					{/* Desktop Nav */}
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal px-1">
							{navItems.map(
								(item) =>
									item.active && (
										<li key={item.name}>
											<button
												onClick={() => navigate(item.slug)}
												className="btn btn-ghost"
											>
												{item.name}
											</button>
										</li>
									)
							)}
							<li className="ml-2">
								<ThemeToggle />
							</li>
						</ul>
					</div>

					{/* Right Side */}
					<div className="navbar-end">
						{authStatus ? (
							<UserOptionsButton />
						) : (
							authButtons.map(
								(item) =>
									item.active && (
										<button
											key={item.name}
											onClick={() => navigate(item.slug)}
											className="btn btn-primary"
										>
											{item.name}
										</button>
									)
							)
						)}
					</div>
				</div>
			</Container>
		</header>
	);
}

export default Header;
