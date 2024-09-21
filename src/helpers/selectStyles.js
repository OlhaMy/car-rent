export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "48px",
    borderRadius: "14px",
    border: "1px solid transparent",
    backgroundColor: "#f7f7fb",
    boxShadow: state.isFocused ? "0 0 0 2px var(--button-color)" : "none",
    "&:hover": {
      boxShadow: "none",
    },
    fontFamily: "'Manrope', sans-serif",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#121417",
    fontSize: "18px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#121417",
    fontSize: "18px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "var(--form_color)" : "#fff",
    color: state.isSelected
      ? "#fff"
      : state.isFocused
      ? "#121417"
      : "rgba(18, 20, 23, 0.2)",
    fontSize: "16px",
    padding: "10px 18px",
    cursor: "pointer",
    transition: "color 0.2s ease-in-out",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "14px",
    boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
    zIndex: 2,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "var(--button-color)" : "#121417",
    "&:hover": {
      color: "#121417",
      transition: "transform 0.3s ease",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
