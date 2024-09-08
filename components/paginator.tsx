import { useEffect, useState } from "react";

interface PaginatorProps {
  totalItems: number;
  limit: number;
  color?: "red" | "green" | "blue" | "white";
  pageChanged?: Function;
  limitChanged?: Function;
  currentPage?: number;
  disabled?: boolean;
}

interface Styling {
  text: string;
  hover_background: string;
  border: string;
  hover_text: string;
  background: string;
}

export default function Paginator(props: PaginatorProps) {
  const {
    totalItems = 1,
    color = "red",
    pageChanged = () => {},
    limitChanged = () => {},
    currentPage = 1,
    limit = 9,
    disabled = false,
  } = props;

  const [displayedNumber, setDisplayedNumber] = useState<any[]>([]);
  let totalPages = Math.ceil(totalItems / limit);

  const [styling, setStyling] = useState<Styling>({
    text: "",
    hover_background: "",
    border: "",
    hover_text: "",
    background: "",
  });

  useEffect(() => {}, [currentPage]);

  useEffect(() => {
    getDisplayedNumber();
    getStyling();
  }, [currentPage, limit]);

  // LOGIC TO DISPLAY PAGINATOR
  const getDisplayedNumber = () => {
    const displayed = [];
    // IF PAGES IS LESS THAN 5, THEN JUST DISPLAY ALL NUMBER
    if (totalPages < 5) {
      for (let i = 0; i < totalPages; i++) {
        displayed.push(i + 1);
      }

      // IF PAGE IS MORE THAN 5, AND IF REACHING THE MAXIMUM VALUE OF TOTAL PAGES, THEN SET PAGINATOR NUMBER WITH LAST 5 NUMBER OF MAXIMUM PAGE
    } else if (totalPages > 5 && currentPage + 4 >= totalPages) {
      for (let i = 4; i >= 0; i--) {
        displayed.push(totalPages - i);
      }

      // IF PAGE IS MORE THAN 5, AND NOT REACHING THE MAXIMUM VALUE OF TOTAL PAGES, THEN RENDER 3 NUMBER FROM CURRENT PAGE, AND LAST PAGE
    } else {
      for (let i = currentPage; i < currentPage + 3; i++) {
        displayed.push(i);
      }
      displayed.push("...");
      displayed.push(totalPages);
    }
    setDisplayedNumber(displayed);
  };

  const getStyling = () => {
    switch (color) {
      case "red":
        setStyling({
          text: "text-accent-red",
          border: "border-accent-red",
          hover_background: "hover:hover:bg-accent-red",
          hover_text: "hover:text-white",
          background: "bg-accent-red",
        });
        break;
      case "green":
        setStyling({
          text: "text-accent-green",
          border: "border-accent-green",
          hover_background: "hover:bg-accent-green",
          hover_text: "hover:text-white",
          background: "bg-accent-green",
        });
        break;
      case "blue":
        setStyling({
          text: "text-accent-blue",
          border: "border-accent-blue",
          hover_background: "hover:bg-accent-blue",
          hover_text: "hover:text-white",
          background: "bg-accent-blue",
        });
        break;
      default:
        setStyling({
          text: "text-white",
          border: "border-white",
          hover_background: "hover:bg-secondary",
          hover_text: "",
          background: "bg-secondary",
        });
        break;
    }
  };

  const setPage = (page: any) => {
    if (page !== "...") {
      pageChanged(page);
    }
  };

  const handleLimitChanged = (limit: number) => {
    // Send to parent
    limitChanged(limit);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 w-full flex-wrap">
      {/* SET LIMIT */}
      <div
        className={`flex flex-row items-center justify-start font-semibold gap-4 text-xs ${styling.text}`}
      >
        <div className="whitespace-nowrap">Por Página:</div>
        <select
          disabled={disabled}
          className={`select bg-transparent border-2 min-h-0 h-fit py-1 rounded-xl text-xs ${styling.border}`}
          defaultValue={limit}
          onChange={(e) => {
            handleLimitChanged(+e.target.value);
          }}
        >
          <option value={21}>21</option>
          <option value={15}>15</option>
          <option value={9}>9</option>
        </select>
      </div>

      {/* BUTTONS */}
      <div
        className={`flex flex-row items-center justify-center gap-4 text-black p-4 text-[10px] gap-6`}
      >
        {totalPages > 5 && (
          <>
            <button
              disabled={currentPage === 1 || disabled}
              onClick={() => setPage(1)}
              className={` disabled:border-gray-200 disabled:text-gray-200 cursor-pointer border-2 rounded-xl min-w-[28px] min-h-[28px] flex flex-row items-center justify-center ${styling.border} ${styling.hover_text} ${styling.hover_background} ${styling.text}`}
            >
              {"<<"}
            </button>

            <button
              disabled={currentPage === 1 || disabled}
              onClick={() => setPage(currentPage - 1)}
              className={` mr-8 disabled:border-gray-200 disabled:text-gray-200 cursor-pointer border-2 rounded-xl min-w-[28px] min-h-[28px] flex flex-row items-center justify-center ${styling.border} ${styling.hover_text} ${styling.hover_background} ${styling.text}`}
            >
              {"<"}
            </button>
          </>
        )}

        {totalPages > 0 &&
          displayedNumber.length > 0 &&
          displayedNumber.map((item, index) => (
            <button
              disabled={disabled}
              key={index}
              onClick={() => setPage(item)}
              className={`
                            ${item !== "..." ? "cursor-pointer" : ""} 
                            border-2 rounded-xl min-w-[28px] min-h-[28px] flex-row items-center justify-center 
                            ${styling.border} ${styling.hover_text} ${
                styling.hover_background
              } ${styling.text} ${
                item === currentPage ? styling.background + " !text-white" : ""
              }
                            ${item === "..." ? "border-none" : ""}
                            disabled:bg-gray-50/50 disabled:text-gray-300 disabled:border-gray-300
                            hidden sm:flex w-full sm:w-fit
                            `}
            >
              {item}
            </button>
          ))}

        {totalPages > 5 && (
          <>
            <button
              disabled={currentPage === totalPages || disabled}
              onClick={() => setPage(currentPage + 1)}
              className={` ml-8 disabled:border-gray-200 disabled:text-gray-200 cursor-pointer border-2 rounded-xl min-w-[28px] min-h-[28px] flex flex-row items-center justify-center ${styling.border} ${styling.hover_text} ${styling.hover_background} ${styling.text}`}
            >
              {">"}
            </button>

            <button
              disabled={currentPage === totalPages || disabled}
              onClick={() => setPage(totalPages)}
              className={` disabled:border-gray-200 disabled:text-gray-200 cursor-pointer border-2 rounded-xl min-w-[28px] min-h-[28px] flex flex-row items-center justify-center ${styling.border} ${styling.hover_text} ${styling.hover_background} ${styling.text}`}
            >
              {">>"}
            </button>
          </>
        )}
      </div>

      {/* TOTAL ITEMS */}
      <div
        className={`flex flex-row items-center justify-start font-semibold gap-4 text-xs ${styling.text}`}
      >
        <div className="whitespace-nowrap">Total Data: {totalItems}</div>
      </div>
    </div>
  );
}
