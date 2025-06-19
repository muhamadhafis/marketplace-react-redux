export const Box = (props) => {
  return (
    <div className="w-[100px] h-[100px] bg-blue-400 justify-center flex items-center">
      <p>Ini box : {props.order}</p>
    </div>
  );
};
