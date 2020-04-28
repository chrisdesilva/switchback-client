import React from "react";
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

const Loading = ({ loading, size, color }) => {
  return (
    <div className="sweet-loading">
      <PacmanLoader
        css={override}
        size={size}
        color={color}
        loading={loading}
      />
    </div>
  );
};

export default Loading;
