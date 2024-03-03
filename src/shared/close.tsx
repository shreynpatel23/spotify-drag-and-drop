import React from "react";

function Close({ classes, onClick, width = "7", height = "7" }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19.141 19.137"
      className={classes}
      onClick={onClick}
    >
      <path
        id="Union_20"
        d="M-3792.092 12932.444l-5.3-5.3-5.3 5.3a2.5 2.5 0 0 1-3.535 0 2.5 2.5 0 0 1 0-3.535l5.3-5.3-5.3-5.3a2.5 2.5 0 0 1 0-3.535 2.5 2.5 0 0 1 1.769-.733 2.5 2.5 0 0 1 1.769.733l5.3 5.3 5.3-5.3a2.5 2.5 0 0 1 1.769-.733 2.5 2.5 0 0 1 1.769.733 2.5 2.5 0 0 1 0 3.535l-5.3 5.3 5.3 5.3a2.5 2.5 0 0 1 0 3.535 2.49 2.49 0 0 1-1.769.733 2.486 2.486 0 0 1-1.773-.733z"
        data-name="Union 20"
        transform="translate(3806.959 -12914.042)"
      />
    </svg>
  );
}

export default Close;
