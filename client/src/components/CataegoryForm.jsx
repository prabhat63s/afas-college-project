import React from "react";

const CataegoryForm = ({ handleSubmit, value, setValue, actions }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
            placeholder="नई श्रेणी दर्ज करें"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button
          className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
          type="submit"
        >
          {actions}
        </button>
      </form>
    </>
  );
};

export default CataegoryForm;
