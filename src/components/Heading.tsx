interface HeadingProps {
  children?: React.ReactNode;
  textAlign?: string;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  textAlign = "text-center",
}) => {
  return (
    <h2 className="py-2 font-bold text-center text-md md:text-lg lg:text-xl xl:text-2xl">
      {children}
    </h2>
  );
};

export default Heading;
