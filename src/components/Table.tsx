interface TableProps {
  headData?: Array<string>;
  bodyData?: Array<Array<string | boolean>>;
}

const Table: React.FC<TableProps> = ({ headData, bodyData }) => {
  const getProcessedCell = (cell: string | boolean) => {
    if (typeof cell === "boolean") {
      return cell ? <i className="text-lg bi bi-check"></i> : <i className="text-lg bi bi-x"></i>;
    }
    else {
      return cell
    }
  }

  return (
    <table className="w-full text-[8px] sm:text-xs md:text-base xl:text-xl">
      <thead className="sticky top-0">
      <tr>
          {headData?.map((data, index) => (
            <th className="odd:bg-blue-100 even:bg-blue-200 p-2 md:p-4 text-center" key={index}>{data}</th>
          ))}
        </tr>
        <tr>
            <th colSpan={headData?.length} className="bg-blue-300 h-[2px]"></th>
        </tr>
      </thead>
      <tbody>
        {bodyData?.map((data, index) => (
          <tr key={index}>
            {data.map((data, index) => (
              <td className="odd:bg-blue-100 even:bg-blue-200 p-2 md:p-4 text-center" key={index}>{getProcessedCell(data)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
