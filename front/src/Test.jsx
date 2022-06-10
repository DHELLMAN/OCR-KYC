import React, { useState } from "react";

const Test = () => {
   
    const [fName,setFName] = useState("hi");

    const change = (event) => {
        setFName(event.target.value);
    }

    return (
        <>
            <form action="../../post" method="post" 
              className="form">
                  <input type='text' placeholder="Enter Your Father's name" onChange={change} name="fName" value={fName}/>
          <button type="submit">Connected?</button>
        </form>
        </>
    );
};

export default Test;