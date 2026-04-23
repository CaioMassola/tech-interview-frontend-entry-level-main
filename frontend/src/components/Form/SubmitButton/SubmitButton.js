function SubmitButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`font-bold py-2 px-4 rounded w-full transition
        ${
          disabled
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-70'
            : 'bg-[#f2f2f2] hover:bg-[#999999] text-black cursor-pointer'
        }`}
    >
      {text}
    </button>
  );
}

export default SubmitButton;