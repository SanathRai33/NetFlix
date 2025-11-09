import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axiosInstance from '../../axios/axiosInstance'
const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      setSuccess('')
      
      if(password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }

      try {
        const response = await axiosInstance.post('/auth/register', { name, email, password, role: 'user' })

        console.log(response)
        if(response.status === 201) {
          setSuccess('Account created successfully')
          setName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
        }
      } catch (error) {
        if(error.response && error.response.data) {
          setError(error.response.data.message || 'Registration failed')
        } else {
          setError('Unable to connect to server. Please make sure the backend is running.')
        }
      }
    }

  return (
    <div>
      {success && <div style={{color: 'green'}}>{success}</div>}
      {error && <div style={{color: 'red'}}>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Name' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="email" 
          placeholder='Email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder='Password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder='Confirm Password' 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type='submit'>Register</button>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  )
}

export default Register
