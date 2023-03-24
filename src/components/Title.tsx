interface TitleProps {
  children?: React.ReactNode;
  textAlign?: string;
}

const Title: React.FC<TitleProps> = ({ children, textAlign = "text-center" }) => {
  return (
    <h1 className={`text-xl font-black md:text-2xl lg:text-3xl xl:text-4xl ${textAlign}`}>
      {children}
    </h1>
  );
};

export default Title;
