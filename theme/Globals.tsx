import { Global } from "@emotion/react";

const Globals = () => {
  return (
    <Global
      styles={`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
      `}
    />
  );
};

export default Globals;
