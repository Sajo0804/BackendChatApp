import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from"axios";
import { registerRoute } from '../utils/Routes';

const Register = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
      if (localStorage.getItem("current user")) {
       navigate("/")
      }
     }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
          const {  username, password } = values;

          // Send input data to backend
          const { data } = await axios.post(registerRoute, {
            username,
            password,
          });

          if (data.status === false) {
            alert(data.msg)
          }

          if (data.status === true) {
            navigate("/login");
          }
        }
      };

    const handleValidation = () => {
        const { password, confirmPassword, username } = values;
        if (password !== confirmPassword) {

          alert("Password and confirm password should be same.")
          return false;
        } else if (username.length < 3) {

          alert("Username should be greater than 3 characters.")
          return false;
        } else if (password.length < 8) {

          alert("Password should be equal or greater than 8 characters.")
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
          <input
            type="password"
            placeholder="Upprepa lösenord"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button className='submit-btn' type="submit">Registrera</button>
          <span>
            Har du redan ett konto? <Link to="/login">Logga in</Link>
          </span>
        </form>
    </div>
  )
}

export default Register