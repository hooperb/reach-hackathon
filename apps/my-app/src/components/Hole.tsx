interface HoleProps {
  value: string;
}

const Hole = ({ value }: HoleProps) => {
  const test = value === "0" ? undefined : value;
  return (
    <div className="Hole">
      <div className={test}></div>
    </div>
  );
};

export default Hole;
