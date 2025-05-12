import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'

import Client_rec from './pages/client_rec'
import Client_hist from './pages/client_hist'

function App() {

    return (
        <>
            <BrowserRouter>
             <Navbar/>
                <Routes>
                    <Route path = "/client_hist" element ={<Client_hist/> }/>
                    <Route path = "/client_rec" element ={<Client_rec/> }/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
