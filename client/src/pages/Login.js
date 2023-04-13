import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from"axios";
import { loginRoute } from '../utils/Routes';

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
      username: "",
      password: "",
  })

  useEffect(() => {
   if (localStorage.getItem("current user")) {
    navigate("/")
   }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;

      // Send input data to backend
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      // Display message that server sends back
      if (data.data.status === false) {
        alert(data.msg)
      }
    
      // If server respons with status = true 
      // save to localstorage
      // navigate to /
      if (data.data.status === true) {
        localStorage.setItem(
          "current user",
          JSON.stringify(data.data.user)
        );
        localStorage.setItem(
          "jwt",
          JSON.stringify(data.accessToken)
        );
        navigate("/");
      }
    }
  }

  const handleValidation = () => {
    const {password, username} = values;
    if (username === "" || password === "") {
      alert("Användarnamn och lösenord behövs.")
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
    <div className="log-in-container">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            placeholder="Användarnamn"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Lösenord"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button className='submit-btn' type="submit">Logga in</button>
          <span>
            Har du inget konto? <Link to="/register">Registrera</Link>
          </span>
        </form>
    </div>
  )
}

export default Login