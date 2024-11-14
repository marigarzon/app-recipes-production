import './Login.css'
// import { users } from '../../data/dataUsers';
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
let urlUsuarios = 'http://localhost:3000/users'

const Login = () => {
  const [stateUser, setStateUser] = useState('')
  const [statePassword, setStatePassword] = useState('')
  const [stateUsters, setStateUsers] = useState([])

  function getUsers() {
    fetch(urlUsuarios)
      .then(response => response.json())
      .then(json => setStateUsers(json))
  }
  
  useEffect(() => {
    getUsers()
  }, [])

  console.log(stateUsters)
  // console.log(users)
  let redireccion = useNavigate()
  function iniciarSesion() {
    if (buscarUsuario()) {
      let timerInterval;
      Swal.fire({
        title: "Bienvenido..",
        html: "Será redirecciónado en <b></b> milliseconds.",
        timer: 2000,
        icon: 'success',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          redireccion('/dashboard')
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario y/o contraseña incorrecto"
      });
    }
  }
  function buscarUsuario() {
    let auth = stateUsters.some((item) => stateUser == item.user && statePassword == item.password)
    console.log(auth)
    return auth
  }

  return (
    <form className="loginForm" action="">
      <input onChange={(e) => { setStateUser(e.target.value) }} placeholder="User" />
      <input onChange={(e) => { setStatePassword(e.target.value) }} placeholder="Password" />
      <input onClick={iniciarSesion} type="button" value="Login" />
      <Link to='/register'>¿No tiene una cuenta?</Link>
    </form>
  );
};


export default Login;
