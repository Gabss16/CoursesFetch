const ButtonDelete = ({ type, onClick, text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-white border border-black text-black font-bold py-2 px-4 rounded transition-colors hover:bg-gray-200"

    >
      {text}
    </button>
  );
};

export default ButtonDelete;
