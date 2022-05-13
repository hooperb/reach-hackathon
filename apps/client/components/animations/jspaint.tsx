import { Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Styles {
  height: number;
  width: number;
}

const JSPaint = () => {
  const [background, setBackground] = useState<Styles>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const styles = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setBackground(styles);
  }, [setBackground]);

  const testing = () => {
    console.log("loaded frame");
    setLoading(false);
  };

  return !background ? (
    <Spinner height="300px" width="300px" />
  ) : (
    <iframe
      height={background.height}
      width={background.width}
      src="https://jspaint.app/"
      title="JS Paint"
      allowFullScreen
      allow="accelerometer; 
           autoplay; 
           clipboard-write; 
           encrypted-media; 
           gyroscope; 
           picture-in-picture"
    />
  );
};
export default JSPaint;
