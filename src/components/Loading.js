import React from "react";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

const Loading = ({ loading, size, color }) => {
  return (
    <div className="sweet-loading">
      <BeatLoader css={override} size={size} color={color} loading={loading} />
    </div>
  );
};

export default Loading;
