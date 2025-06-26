type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  withClass: string 
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  withClass

}) => {
  return (
    <button
      onClick={onClick}
      className={`${withClass} hover:bg-blue-600 bg-blue-500 font-semibold active:bg-blue-600 transition-all duration-200 cursor-pointer text-black h-10 rounded-sm`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;