/* eslint-disable react/prop-types */
function Button({ buttonText, handleClick }) {
  return (
    <button
      className="bg-gray-500  mx-2 lg:ml-6 hover:bg-blue-700 text-white font-bold py-[6px] px-4 lg:px-10 rounded text-xs lg:text-base"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}
export default Button;
