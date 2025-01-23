import React, { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown"; 

const TableWithDropdowns = () => {
  const singleSelectOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedSingleOptions, setSelectedSingleOptions] = useState({});
  const [rows, setRows] = useState([{ id: 1 }]);

  const handleSingleSelectChange = (rowId, value) => {
    setSelectedSingleOptions((prev) => ({
      ...prev,
      [rowId]: value,
    }));
  };

  const handleAddRow = () => {
    setRows((prev) => [...prev, { id: prev.length + 1 }]);
  };

  const isSingleOptionDisabled = (option) =>
    Object.values(selectedSingleOptions).includes(option);

  return (
    <div style={{ margin: "20px" }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          textAlign: "left",
          margin: "0 auto",
          borderRadius:"18px" 
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Label 1</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                <select
                  value={selectedSingleOptions[row.id] || ""}
                  onChange={(e) => handleSingleSelectChange(row.id, e.target.value)}
                  style={{
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "100%",
                  }}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {singleSelectOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                      disabled={isSingleOptionDisabled(option)}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                <MultiSelectDropdown />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
  onClick={handleAddRow}
  className="add-row"
>
  + Add New Row
</button>

    </div>
  );
};

export default TableWithDropdowns;
