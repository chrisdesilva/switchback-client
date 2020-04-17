import React from "react";
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Loading = ({ loading, size, color }) => {
  return (
    <div className="sweet-loading">
      <CircleLoader
        css={override}
        size={size}
        color={color}
        loading={loading}
      />
    </div>
  );
};

export default Loading;
