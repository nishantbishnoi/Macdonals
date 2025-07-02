import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
 // 🟡 Step 1: Import

const Navbar = () => {
  const [datas, setdatas] = useState([]);
  const navigate = useNavigate(); // 🟡 Step 2: Setup navigation hook

  useEffect(() => {
    fetch('https://macback.onrender.com/catego', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then((Response) => Response.json())
      .then((response) => {
        let data = response.response;
        setdatas(data);
      });
  }, []);

  return (
    <>
   
    <div id="f2">
      {datas.map((e, index) => (
        <div key={index} id="main" onClick={() => navigate(`/${e.discription.toLowerCase()}`)}>
          <div id="f1">
            <img src={e.Image} width={120} height={100} id="f3" alt={e.discription} />
            <br />
            <h5 id="f4">{e.discription}</h5>
          </div>
        </div>
      ))}
    </div>
      </>
  );
};

export default Navbar;
