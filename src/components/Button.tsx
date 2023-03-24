import Title from "./Title";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled }) => {
  if (disabled) {
    return (
      <button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 border-2 border-blue-600 rounded opacity-50 cursor-not-allowed md:text-md">
        {children}
      </button>
    );
  } else {
    return (
      <button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 border-2 border-blue-600 rounded md:text-md hover:bg-blue-600 focus:bg-blue-700 hover:border-blue-700 focus:border-blue-800">
        {children}
      </button>
    );
  }
};

export default Button;
