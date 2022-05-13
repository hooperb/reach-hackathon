import { Text, Flex, Box } from "@chakra-ui/react";

interface HeaderBoxProps {
  text: string;
}

const HeaderBox = ({ text }: HeaderBoxProps) => (
  <Text
    height="60px"
    width="260px"
    backgroundColor="#fff"
    border="4px solid #000"
    fontSize="20px"
    fontFamily="'Roboto Mono', sans-serif;"
  >
    <Box margin="8px">{text}</Box>
  </Text>
);

export default HeaderBox;
