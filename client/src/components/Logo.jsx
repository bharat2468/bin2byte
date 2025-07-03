import { LogoImage } from "../../public";
// Logo.jsx
function Logo() {
	return (
		<div className="flex items-center gap-2">
			<img
				src={LogoImage}
				alt="Bin2Byte Logo"
				className=" w-12 h-12 mask mask-squircle object-contain"
			/>
			<div className="flex flex-col leading-tight">
				<span className="font-bold text-lg text-primary">Bin2Byte</span>
				<span className="text-xs text-muted">
					Leftover food for those who want it
				</span>
			</div>
		</div>
	);
}
export default Logo;
