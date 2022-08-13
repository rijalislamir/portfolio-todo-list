import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Activity from './pages/Activity'
import './App.css'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/detail/:id" element={<Activity />} />
		</Routes>
	)
}

export default App
