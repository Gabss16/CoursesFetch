const Button = ({ type, onClick, text }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      {text}
    </button>
  );
};

export default Button;
