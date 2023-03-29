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
            <th className="p-2 text-center odd:bg-blue-100 even:bg-blue-200 md:p-4" key={index}>{data}</th>
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
              <td className="p-2 text-center odd:bg-blue-100 even:bg-blue-200 md:p-4" key={index}>{getProcessedCell(data)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
