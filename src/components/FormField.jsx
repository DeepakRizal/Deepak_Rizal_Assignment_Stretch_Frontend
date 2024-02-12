/* eslint-disable react/prop-types */

function FormField({ handleChange, label, id, placeholder, ...rest }) {
  return (
    <div className="flex gap-3">
      <label className=" font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className="border border-2-gray-800"
        onChange={handleChange}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}

export default FormField;
