import '../global.css';

const Shadow = ({props}) => {

  return (
    <div
      className='shadow'
      onClick={() => props.setShow(false)}
      style={{
        opacity: props.show ? props.opacity : 0,
        zIndex: props.show ? 50 : -5,
        transition: props.transition
      }}
    ></div>
  );
};

export default Shadow;
