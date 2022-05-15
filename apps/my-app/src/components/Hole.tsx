interface HoleProps {
	value: string;
}

const Hole = ({ value }: HoleProps) => {
	return (
		<div className="Hole">
			<div className={value}></div>
		</div>
	);
};

export default Hole;
