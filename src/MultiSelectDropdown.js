import React, { useState, useRef } from "react";

const MultiSelectDropdown = () => {
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3", "Option 4"]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);


  const dropdownRef = useRef(null);

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "" && !options.includes(newOption)) {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleBlur = (e) => {
    
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownVisible(false);
    }
  };

  return (
    <div
      style={{ width: "700px", margin: "20px auto", position: "relative" }}
      onBlur={handleBlur}
      tabIndex={0} 
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={toggleDropdown}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", flex: 1 }}>
          {selectedOptions.map((option, index) => (
            <span
              key={index}
              style={{
                backgroundColor: "#e0e0e0",
                padding: "5px 10px",
                borderRadius: "15px",
                fontSize: "14px",
                display: "inline-block",
              }}
            >
              {option}{" "}
              <span
                style={{ cursor: "pointer", marginLeft: "5px", color: "#999" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOptions(selectedOptions.filter((item) => item !== option));
                }}
              >
                x
              </span>
            </span>
          ))}
        </div>
        <span
          style={{
            cursor: "pointer",
            marginLeft: "10px",
            fontSize: "18px",
            transform: isDropdownVisible ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s",
          }}
        >
          ▼
        </span>
      </div>

      {isDropdownVisible && (
        <div
          ref={dropdownRef} 
          style={{
            border: "1px solid #ccc",
            borderTop: "none",
            maxHeight: "200px",
            overflowY: "auto",
            position: "absolute",
            width: "100%",
            background: "#fff",
            zIndex: 10,
          }}
        >
          {options.map((option, index) => (
            <div key={index} style={{ padding: "10px", borderBottom: "1px solid #f0f0f0" }}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                  style={{ marginRight: "10px" }}
                />
                {option}
              </label>
            </div>
          ))}
          <div style={{ padding: "10px", display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Add new item"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                marginRight: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%", 
              }}
            />
            <button
              onClick={handleAddOption}
              style={{
                padding: "8px",
                backgroundColor: "black",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              + Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
