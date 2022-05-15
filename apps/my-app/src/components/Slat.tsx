import Hole from "./Hole";

interface SlatProps {
	handleClick: () => void;
	holes: [];
}

const Slat = ({ handleClick, holes }: SlatProps) => {
	return (
		<div className="Slat" onClick={() => handleClick()}>
			{[...Array(holes.length)].map((x, j) => (
				<Hole key={j} value={holes[j]}></Hole>
			))}
		</div>
	);
};

export default Slat;
