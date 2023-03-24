interface GridProps {
  children?: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-4 gap-4 md:grid-rows-2 md:grid-cols-2">
      {children}
    </div>
  );
};

export default Grid;
