import { Navigate, Route, Routes } from 'react-router-dom'
import { Auth, Chat, Profile } from './Index'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  )
}

export default App
