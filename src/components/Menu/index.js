import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png'
import './style.css'

export default function Menu() {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className='options'>
        <div className='menu-button' onClick={() => setVisible(!visible)}>
          <ion-icon name="menu" style={{ color: '#FFF', fontSize: 50 }}></ion-icon>
        </div>

        <a href='/'>
          <img src={logo} style={{ maxWidth: 70 }} />
        </a>


      </div>

      {!visible ? null :
        <div className='menu-itens'>
          <a href='/'><h2>Home</h2></a>
          <a href='/caminhoes'><h2>Caminhões</h2></a>
          <a href='/motoristas'><h2>Motoristas</h2></a>
          {/* <a href='/caminhoes'><h2>Clientes</h2></a> */}
          <a href='/enderecos'><h2>Endereços</h2></a>
          <a href='/cargas'><h2>Cargas</h2></a>
          <a href='/despachos'><h2>Despachos</h2></a>
          <a href='/frete'><h2>Calcular Frete</h2></a>
        </div>
      }
    </nav>
  );
}
