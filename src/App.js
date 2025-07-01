import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Caminhoes from './screens/Caminhoes/index.js';
import FormCaminhoes from './screens/Caminhoes/Form.js';
import Enderecos from './screens/Enderecos/index.js';
import FormEnderecos from './screens/Enderecos/Form.js';
import Motoristas from './screens/Motoristas/index.js';
import FormMotoristas from './screens/Motoristas/Form.js';
import FormCargas from './screens/Cargas/Form.js';
import Cargas from './screens/Cargas/index.js';
import Frete from './screens/Frete/index.js';
import Clientes from './screens/Clientes/index.js';
import Menu from './components/Menu/index.js';
import Login from './screens/Login/index.js';
import Home from './screens/Home.js';
import './App.css';
import PaginaSegura from './components/PaginaSegura/index.js';
import Api from './services/Api.js';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    Api.setTokenAxios();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <BrowserRouter>
        <Menu />

        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/caminhoes' element={<PaginaSegura> <Caminhoes /> </PaginaSegura>} />
            <Route path='/formcaminhoes' element={<PaginaSegura ><FormCaminhoes /> </PaginaSegura>} />
            <Route path='/formcaminhoes/:id' element={<PaginaSegura ><FormCaminhoes /> </PaginaSegura>} />

            <Route path='/enderecos' element={<PaginaSegura ><Enderecos /> </PaginaSegura>} />
            <Route path='/formenderecos' element={<PaginaSegura ><FormEnderecos /> </PaginaSegura>} />
            <Route path='/formenderecos/:id' element={<PaginaSegura ><FormEnderecos /> </PaginaSegura>} />

            <Route path='/motoristas' element={<PaginaSegura> <Motoristas /> </PaginaSegura>} />
            <Route path='/formmotoristas' element={<PaginaSegura> <FormMotoristas /> </PaginaSegura>} />
            <Route path='/formmotoristas/:id' element={<PaginaSegura> <FormMotoristas /> </PaginaSegura>} />

            <Route path='/cargas' element={<PaginaSegura> <Cargas /> </PaginaSegura>} />
            <Route path='/formcargas' element={<PaginaSegura> <FormCargas /> </PaginaSegura>} />
            <Route path='/formcargas/:id' element={<PaginaSegura> <FormCargas /> </PaginaSegura>} />

            <Route path='/frete' element={<PaginaSegura> <Frete /> </PaginaSegura>} />
            <Route path='/clientes' element={<Clientes />} />
            <Route path='/clientes/:id' element={<Clientes />} />

            <Route path='/login' element={<Login />} />

            <Route path='*' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
