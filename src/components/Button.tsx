import Title from "./Title";

interface ButtonProps {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="px-4 py-2 m-auto font-bold text-white bg-orange-500 border-2 border-orange-600 rounded hover:bg-orange-600 focus:bg-orange-700 hover:border-orange-700 focus:border-orange-800">
      {children}
    </button>
  );
};

export default Button;
