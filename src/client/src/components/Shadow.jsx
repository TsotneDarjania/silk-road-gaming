import "../global.css";

const Shadow = ({ props }) => {
  return (
    <div
      className="shadow"
      onClick={() =>
        props.open ? props.setShow(true) : props.setShow(false)
      }
      style={{
        opacity: props.show ? props.opacity : 0,
        zIndex: props.show ? 50 : -5,
        transition: props.transition,
      }}
    ></div>
  );
};

export default Shadow;
