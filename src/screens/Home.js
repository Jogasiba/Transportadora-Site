import './Home.css'
import CaminhaoIcon from '../assets/caminhao-icon.png'
import MotoristaIcon from '../assets/motorista-icon.png'
import ClienteIcon from '../assets/cliente-icon.png'
import FreteIcon from '../assets/frete-icon.png'
import EnderecoIcon from '../assets/endereco-icon.png'
import CargaIcon from '../assets/carga-icon.png'
import DespachoIcon from '../assets/despacho-icon.png'

export default function Home() {
    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>ESCOLHA UMA OPÇÃO:</h1>
            </div>

            <div className='content'>
                <a href='/caminhoes'>
                    <div className='content-option'>
                        <img src={CaminhaoIcon} />
                        <h1>Caminhões</h1>
                    </div>
                </a>

                <a href='/motoristas'>
                    <div className='content-option'>
                        <img src={MotoristaIcon} />
                        <h1>Motoristas</h1>
                    </div>
                </a>

                {/* <a href='/clientes'>
                    <div className='content-option'>
                        <img src={ClienteIcon} />
                        <h1>Sua Conta</h1>
                    </div>
                </a> */}

                <a href='/enderecos'>
                    <div className='content-option'>
                        <img src={EnderecoIcon} />
                        <h1>Endereços</h1>
                    </div>
                </a>

                <a href='/cargas'>
                    <div className='content-option'>
                        <img src={CargaIcon} />
                        <h1>Cargas</h1>
                    </div>
                </a>

                <a href='/enderecos'>
                    <div className='content-option'>
                        <img src={DespachoIcon} />
                        <h1>Despachos</h1>
                    </div>
                </a>

                <a href='/frete'>
                    <div className='content-option'>
                        <img src={FreteIcon} />
                        <h1>Calcular Frete</h1>
                    </div>
                </a>
            </div>
        </div>
    );
}