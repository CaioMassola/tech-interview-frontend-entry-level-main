import React from 'react';

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="bg-[#f2f2f2] hover:bg-[#999999] text-black font-bold py-2 px-4 rounded w-full"
    >{text}
    </button>);
}

export default SubmitButton;
