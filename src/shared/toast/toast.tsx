import React from "react";
import Close from "../close";
import * as Styles from "./toast.module.scss";

export default function Toast({ message, removeToast }: any) {
  return (
    <div className={Styles.toast_position}>
      <div className="flex align-items-center">
        <p className={`${Styles.toast_message} flex-grow-1`}>{message}</p>
        <div className="p-2">
          <Close
            classes={Styles.close_svg}
            onClick={() => removeToast()}
            width="10"
            height="10"
          />
        </div>
      </div>
    </div>
  );
}
