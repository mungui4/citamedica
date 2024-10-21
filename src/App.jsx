
import { RegistroCita } from './pages/registro/RegistroCita';
import { VerRegistro } from './pages/verRegistro/VerRegistro';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css'
import { Edit } from './pages/edit/Edit';

function App() {
 

  return (
    <>
    <BrowserRouter>
    <div className='menuContainer'>
    <Link to='/'><button className='menuButton'>Crear cita</button></Link>
    <Link to='/ver-citas'><button className='menuButton'>Ver citas</button></Link>
    
    </div>
    
      <div className='container'>
        <div className='mainContent'>
        <Routes>
        <Route path='/' element={<RegistroCita/>}/>
        <Route path='/ver-citas' element={<VerRegistro/>}/>
        <Route path='/editar-citas/:id' element={<Edit/>}/>
        </Routes>
        </div>
       
      
      
      
      </div>
      
      </BrowserRouter>
    </>
  )
}

export default App
