import React, { useState, useEffect } from "react";

export const User: React.FC = () => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setName("ron");
  }, []);

  return (
    <>
      <div>
        <h1>User : {name} </h1>
      </div>
    </>
  );
};
