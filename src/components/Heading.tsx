interface TitleProps {
  children?: React.ReactNode;
  textAlign?: string;
}

const Title: React.FC<TitleProps> = ({
  children,
  textAlign = "text-center",
}) => {
  return (
    <h2 className="py-2 font-bold text-center text-md md:text-lg lg:text-xl xl:text-2xl">
      {children}
    </h2>
  );
};

export default Title;
