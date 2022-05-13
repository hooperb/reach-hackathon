import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface RedSquareProps {
  visible: boolean;
}

const RedSquare = ({ visible }: RedSquareProps) =>
  visible ? (
    <GridItem>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="32" height="32" strokeWidth="3" stroke="#000" fill="red" />
      </svg>
    </GridItem>
  ) : (
    <GridItem>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="32" height="32" fill="none" className="emptyRedSquare" />
      </svg>
    </GridItem>
  );

const TetrisIcon = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime((prevTime) => (prevTime % 4) + 1); // <-- Change this line!
    }, 500);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <Flex display="columns" margin="8px">
      <Grid templateColumns="repeat(5, 0.01fr)" gap={0}>
        <RedSquare visible={time === 2} />
        <RedSquare visible={time === 2 || time === 4} />
        <RedSquare visible={false} />
      </Grid>
      <Grid templateColumns="repeat(5, 0.01fr)" gap={0}>
        <RedSquare visible={time === 1 || time === 2 || time === 3} />
        <RedSquare visible={time === 3 || time === 4} />
        <RedSquare visible={time === 3} />
      </Grid>
      <Grid templateColumns="repeat(5, 0.01fr)" gap={0}>
        <RedSquare visible={time === 1 || time === 2 || time === 4} />
        <RedSquare visible={time === 1 || time === 4} />
        <RedSquare visible={time === 1 || time === 3} />
      </Grid>
    </Flex>
  );
};

export default TetrisIcon;
