import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { BiExport } from "react-icons/bi";

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument-spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      onClick={(e) => exportToExcel(fileName)}
      style={{ 
        cursor: "pointer",
        padding: "8px 16px",
        color: "white",
        fontSize: "larger",
        backgroundColor: "black",
        borderRadius: "4px",
        fontFamily: "Poppins",
        marginTop: "8px",
      }}
    >
      <div style={{display:"flex", alignItems:"center", gap:"8px", justifyContent:"center"}}>
        <BiExport style={{
          fontSize: "24px",
        }}/>
        EXPORT REPORTS
      </div>
    </button>
  );
};

export default ExportExcel;
