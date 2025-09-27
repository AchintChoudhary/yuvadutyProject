// FILE: frontend/src/components/SignUpPage.jsx
import React, { useState, useContext } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useContext(UserDataContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      })
      
      if (response.status === 201) {
        const { token, user } = response.data
        login(token, user)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-6">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-8"
  >
    <h2 className="text-2xl font-bold text-center text-white">Join CivicConnect</h2>
    <p className="text-center text-gray-400 mt-2">
      Create your account to start reporting and connecting.
    </p>

    {error && (
      <div className="mt-4 p-3 bg-red-900/50 text-red-400 rounded-lg text-sm">
        {error}
      </div>
    )}

    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-300">First Name *</label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Email *</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Password *</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password (min. 8 characters)"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
          required
          minLength={8}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Confirm Password *</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-gray-700 text-white placeholder-gray-400"
          required
          minLength={8}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-black font-semibold py-2 rounded-lg shadow hover:bg-orange-600 transition disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Register'}
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-gray-400">
      Already have an account? <a href="/login" className="text-orange-500 font-medium hover:underline">Login</a>
    </p>
  </motion.div>
</div>
  )
}

export default Signup