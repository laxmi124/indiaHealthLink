import React, { useState, useEffect } from "react";

function Home() {
    const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/students")
      .then((response) => response.json())
      .then((data) => {
          setUsersList(data);
          console.log('data', data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
    return <div>
        <ul>
            {
                usersList.map((item) => <li>Id: {item?.id}----- email: { item?.email}</li>)
            }
      </ul>
  </div>;
}

export default Home;
