import "../global.css";
import { useEffect, useRef, useState } from "react";

const Shadow = (props) => {
  return (
    <div
      className="shadow"
      onClick={() => props.setShow(false)}
      // onClick={() =>
      //   props.open ? props.setShow(true) : props.setShow(false)
      // }
      style={{
        opacity: props.show === true ? 1 : 0,
      }}
    >
      {console.log(props.show)}
    </div>
  );
};

export default Shadow;
