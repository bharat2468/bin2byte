import { PlacesCard } from './';

const PlacesList = ({ data }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6 pb-14">
			{data.map((item, index) => (
				<PlacesCard card_detail={item} key={index} />
			))}
		</div>
	);
};

export default PlacesList;
