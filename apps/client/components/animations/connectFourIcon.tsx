import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface RedCircleProps {
  visible: boolean;
}

const RedCircle = ({ visible }: RedCircleProps) =>
  visible && (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <circle cx="16" cy="16" r="14" stroke="#fd0000" fill="red" />
    </svg>
  );

const ConnectFourIcon = () => {
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
    <Grid
      templateColumns="repeat(5, 0.1fr)"
      height="96px"
      paddingTop="48px"
      gap={1}
    >
      <GridItem width="6px">
        <RedCircle visible={time >= 1} />
      </GridItem>
      <GridItem width="6px">
        <RedCircle visible={time >= 2} />
      </GridItem>
      <GridItem width="6px">
        <RedCircle visible={time >= 3} />
      </GridItem>
      <GridItem width="6px">
        <RedCircle visible={time >= 4} />
      </GridItem>
    </Grid>
  );
};

export default ConnectFourIcon;
