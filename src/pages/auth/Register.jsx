import { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import './Register.css'
import { Link } from 'react-router-dom'
let urlUsuarios = 'http://localhost:3000/users'

const Register = () => {

  const [stateName, setStateName] = useState('')
  const [stateUser, setStateUser] = useState('')
  const [statePassword, setStatePassword] = useState('')
  const [stateEmail, setStateEmail] = useState('')
  const [statePhone, setStatePhone] = useState('')
  const [stateUsters, setStateUsers] = useState([])

  function getUsers() {
    fetch(urlUsuarios)
      .then(response => response.json())
      .then(json => setStateUsers(json))
  }
  useEffect(() => {
    getUsers()
  }, [])

  function buscarUsuario() {
    let auth = stateUsters.some((item) => stateUser == item.user || stateEmail == item.email)
    console.log(auth)
    return auth
  }

  function createUser() {
    let newUser = {
      id: v4(),
      user: stateUser,
      email: stateEmail,
      name: stateName,
      password: statePassword,
      phone: statePhone
    }
    fetch(urlUsuarios, {
      method: 'POST',
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuario creado exitosamente', data)
        // setStateName('')
        // setStateUser('')
        // setStatePassword('')
        // setStatePhone('')
        // setStateEmail('')
      })
  }

  function registerUser() {
    if (buscarUsuario()) {
      console.log('Usuario ya existe en la base de datos...')
    } else {
      createUser()
    }
  }

  return (
    <form className='registerForm'>
      <input onChange={(e) => { setStateName(e.target.value) }} placeholder='Name' type="text" />
      <input onChange={(e) => { setStateUser(e.target.value) }} placeholder="User" type="text" />
      <input onChange={(e) => { setStatePassword(e.target.value) }} placeholder="Password" type="text" />
      <input onChange={(e) => { setStateEmail(e.target.value) }} placeholder="Email" type="text" />
      <input onChange={(e) => { setStatePhone(e.target.value) }} placeholder="Phone" type="text" />
      <input onClick={registerUser} type="button" value="Register" />
      <Link to='/login'>¿Ya tiene una cuenta?</Link>
    </form>
  )
}

export default Register