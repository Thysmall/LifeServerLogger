import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Log from './pages/Log.js'
import Home from './pages/Home.jsx'
import New from './pages/New.jsx'

function Routerer(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/log' element={<Log />}/>
                <Route path='/new' element={<New />}/>
            </Routes>
        </Router>
    )
}

export default Routerer