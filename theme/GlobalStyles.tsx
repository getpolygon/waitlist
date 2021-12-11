import { Global } from "@emotion/react";

export const GlobalStyles = () => {
  return (
    <Global
      styles={`
        // @font-face {
        //   font-style: normal;
        //   font-family: anurati;
        //   src: url("/fonts/Anurati-Regular.otf")
        // }
      `}
    />
  );
};
