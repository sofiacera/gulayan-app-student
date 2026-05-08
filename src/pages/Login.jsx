import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSignUpClick = () => {
    if (window.confirm("Are you sure you want to sign up?")) {
      navigate('/signup');
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    //TODO make the login process functional

    setIsLoading(false)

  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 
          rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M3 21l5-5m0 0l5 5m-5-5V3m7 0l5 5m-5-5v18" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">Gulayan</h1>
          <p className="text-green-600">Magtanim ay di biro.</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                                focus:ring-green-500 focus:border-transparent transition duration-200 
                                outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                                 focus:ring-green-500 focus:border-transparent transition duration-200 
                                 outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            {/* TODO disable and show loading icon while logging in. */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
                            hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 
                            focus:ring-offset-2 transition duration-200 shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? <FaSpinner className="animate-spin inline mr-2" /> : null}
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Sign Up Link */}
          {/* TODO disable sign up link while logging in */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={handleSignUpClick}
              disabled={isLoading}
              className={`cursor-pointer text-green-600 hover:text-green-700 font-semibold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Sign up for free
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-green-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default Login
