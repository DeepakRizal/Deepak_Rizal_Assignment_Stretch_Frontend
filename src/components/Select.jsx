/* eslint-disable react/prop-types */
const Select = ({
  options,
  defaultValue,
  className,
  handleChange,
  name,
  handleClick,
}) => {
  return (
    <select
      onChange={handleChange}
      className={className}
      defaultValue={defaultValue}
      onClick={handleClick}
      name={name}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
