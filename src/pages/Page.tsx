import React, { useState, useEffect } from "react";

export const Page: React.FC = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setName("ron");
  }, []);

  return (
    <>
      <div>
        <h1>Page : {name} </h1>
      </div>
    </>
  );
};
