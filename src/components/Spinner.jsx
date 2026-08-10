import React from "react";

const Spinner = () => {
  const spinnerSrc = process.env.PUBLIC_URL + "/loading.gif";

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <img
        src={spinnerSrc}
        alt="Loading..."
        style={{ width: "80px", height: "80px", objectFit: "contain" }}
      />
    </div>
  );
};

export default Spinner;
