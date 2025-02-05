import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../../components/Input'
import { User, Mail, Lock, Loader,Phone ,SquareUserRound} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter'
import { useAuthStore } from '../../store/authStore'
import Select from '../../components/Select'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('') // Added phone number
  const [gender, setGender] = useState('') // Added gender
  const { signup, error, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !phoneNumber || !gender) {  // Check if all fields are filled
      console.log('Please fill in all fields.')
      return
    }
    try {
      await signup(email, password, name, phoneNumber, gender) // Pass phoneNumber and gender to signup
      navigate('/verify-email')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-2 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8 ">
        <h2 className="w-full sm:w-[500px] md:w-[500px] lg:w-[600px] xl:w-[600px] max-w-full   text-3xl font-bold mb-6 text-center bg-gradient-to-br from-blue-800 via-indigo-500 to-teal-400 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={Phone} // Optional: You can use a phone icon for the phone number input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="mb-4">
           <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <Select
            icon={SquareUserRound} // Pass Gender icon
            id="gender"
            name="gender"
            value={gender} // Make sure this value is tied to formData
            onChange={(e)=>setGender(e.target.value)} // Handle change for gender
            required
          />
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          {/* Password strength meter */}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
            font-bold rounded-lg shadow-lg hover:from-green-600
            hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : 'Sign Up'}
          </motion.button>
        </form>
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default SignUp
