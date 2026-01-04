import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

export function GroupedDataTable({ rows, columns }) {
  // Group data berdasarkan line
  const groupedData = rows.reduce((acc, row) => {
    const line = row.line || "UNDEFINED";
    if (!acc[line]) acc[line] = [];
    acc[line].push(row);
    return acc;
  }, {});

  const hasData = rows && rows.length > 0;

  return (
    <Paper
      sx={{
        width: "100%",
        height: "calc(100vh - 280px)",
        p: 2,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {hasData ? (
        <div className="overflow-x-auto flex-1">
          {Object.entries(groupedData).map(([line, items], idx) => (
            <div key={idx} className="mb-6 border rounded-lg bg-white">
              <div className="bg-gray-100 font-semibold px-4 py-2 text-gray-700 w-full">
                {line}
              </div>

              <table className="w-full border-collapse ">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 text-sm">
                    {columns.map((col) => (
                      <th
                        key={col.field}
                        className="border p-2 text-center font-medium"
                        style={{
                          width: col.flex ? `${col.flex * 100}px` : "auto",
                        }}
                      >
                        {col.headerName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, i) => (
                    <tr
                      key={i}
                      className={`text-sm ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition`}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.field}
                          className={`border text-${col.align || "center"} ${
                            col.field === "color"
                              ? (() => {
                                  const color = (
                                    row[col.field] || ""
                                  ).toUpperCase();
                                  switch (color) {
                                    case "BK":
                                      return "bg-black text-white p-0";
                                    case "C":
                                      return "bg-[#00FFFF] text-black p-0";
                                    case "M":
                                      return "bg-[#FF00FF] text-black p-0";
                                    case "Y":
                                      return "bg-[#FFFF00] text-black p-0";
                                    case "LC":
                                      return "bg-cyan-300 text-black p-0";
                                    case "LM":
                                      return "bg-pink-300 text-black p-0";
                                    default:
                                      return "bg-gray-100 text-black p-0";
                                  }
                                })()
                              : col.field === "level"
                              ? (() => {
                                  const level = (
                                    row[col.field] || ""
                                  ).toUpperCase();
                                  switch (level) {
                                    case "C":
                                      return "bg-[#C6EFCE] text-[#006100] p-0 text-xl";
                                    case "B":
                                      return "bg-[#8DB4E2] text-[#9C0006] p-0 text-xl";
                                    case "A":
                                      return "bg-[#FFC000] text-[#9C0006] p-0 text-xl";
                                    case "T":
                                      return "bg-[#FFEB9C] text-[#9C5700] p-0 text-xl";
                                    case "S":
                                      return "bg-[#FFC7CE] text-[#9C0006] p-0 text-xl";
                                    default:
                                      return "bg-gray-200 text-gray-800 p-0 text-xl";
                                  }
                                })()
                              : "p-2"
                          }`}
                        >
                          {col.field === "color" || col.field === "level" ? (
                            <div className="flex items-center justify-center font-semibold w-full h-full min-h-[36px]">
                              {(row[col.field] || "").toUpperCase()}
                            </div>
                          ) : col.renderCell ? (
                            col.renderCell({ value: row[col.field], row })
                          ) : (
                            row[col.field] ?? ""
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        // 👇 Tampilan kalau tidak ada data
        <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
          No data available
        </div>
      )}
    </Paper>
  );
}

export function DataTable({ rows, columns }) {
  return (
    <Paper sx={{ height: 721, width: "100%", padding: "20px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            padding: "0px",
            fontSize: "14px",
          },
          "& .MuiDataGrid-row": {
            "&:nth-of-type(odd)": { backgroundColor: "#" },
            "&:hover": { backgroundColor: "#e0e0e0" },
          },
        }}
      />
    </Paper>
  );
}

export function DataTablePengajuan({ rows, columns }) {
  return (
    <Paper sx={{ height: 500, width: "100%", padding: "20px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            padding: "0px",
            fontSize: "14px",
          },
          "& .MuiDataGrid-row": {
            "&:nth-of-type(odd)": { backgroundColor: "#" },
            "&:hover": { backgroundColor: "#e0e0e0" },
          },
        }}
      />
    </Paper>
  );
}
