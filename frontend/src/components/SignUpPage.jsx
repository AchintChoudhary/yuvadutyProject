
import {motion}  from "framer-motion";
const Signup=()=>{
return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 p-6">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
>
<h2 className="text-2xl font-bold text-center text-gray-800">Join CivicConnect</h2>
<p className="text-center text-gray-500 mt-2">
Create your account to start reporting and connecting.
</p>


<form className="mt-6 space-y-4">
<div>
<label className="block text-sm font-medium text-gray-600">First Name</label>
<input
type="text"
placeholder="Enter your name"
className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
/>
<label className="block text-sm font-medium text-gray-600">Last Name</label>
<input
type="text"
placeholder="Enter your name"
className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
/>
</div>


<div>
<label className="block text-sm font-medium text-gray-600">Email</label>
<input
type="email"
placeholder="Enter your email"
className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
/>
</div>


<div>
<label className="block text-sm font-medium text-gray-600">Password</label>
<input
type="password"
placeholder="Enter your password"
className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
/>
</div>


<div>
<label className="block text-sm font-medium text-gray-600">Confirm Password</label>
<input
type="password"
placeholder="Re-enter your password"
className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
/>
</div>


<button
type="submit"
className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
>
Register
</button>
</form>


<p className="mt-6 text-center text-sm text-gray-600">
Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Login</a>
</p>
</motion.div>
</div>
);
}

export default Signup