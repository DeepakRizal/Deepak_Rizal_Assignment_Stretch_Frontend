/* eslint-disable react/prop-types */

function MultiSelect({
  identifier,
  handleSelect,
  label,
  id,
  options,
  ...rest
}) {
  return (
    <div className="flex mt-2 gap-4">
      <label htmlFor={id} className="mb-2 font-semibold">
        {label}
      </label>
      <select multiple size="4" id={id} {...rest}>
        {options.map((option) => (
          <option
            onClick={(e) => handleSelect(e, identifier)}
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MultiSelect;
