import './Form.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function FormCaminhoes() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [placa, setPlaca] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [status, setStatus] = useState(true);
    const [modelo, setModelo] = useState('');
    const [tipo, setTipo] = useState('');
    const [motorista, setMotorista] = useState('');

    const [motoristas, setMotoristas] = useState([])

    const voltar = () => {
        navegacao('/caminhoes');
    };

    const buscar = async () => {
        let { data } = await axios.get(`http://localhost:5000/motorista`);
        setMotoristas(data);

        if(data){
            setMotorista(data[0].motorista_id)
        }
    }

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:5000/caminhao/${id}`);
        setPlaca(data.placa);
        setCapacidade(data.capacidade);
        setStatus(data.status);
        setModelo(data.modelo);
        setTipo(data.tp_carroceria);
    }

    const salvar = async () => {
        let body = {
            "placa": placa,
            "capacidade": capacidade,
            "status": status,
            "modelo": modelo,
            "tp_carroceria": tipo,
        };

        if (id) {
            await axios.put(`http://localhost:5000/caminhao/${id}`, body);
        }
        else {
            await axios.post(`http://localhost:5000/caminhao`, body);
        }
        voltar();
    }

    const handleSelect = (e) => {
        setStatus(e.target.value)
    }

    const handleMotorista = (e) => {
        setMotorista(e.target.value)
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
        buscar();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>{id ? 'ALTERAÇÃO' : 'CADASTRO'} DE CAMINHÕES</h1>

                <button className='cancel' onClick={() => voltar()}>
                    <h1>Cancelar</h1>
                </button>

                <button className='confirm' onClick={() => salvar()}>
                    <h1>Salvar</h1>
                </button>
            </div>

            <div className='form'>
                <div className='form-row'>
                    {!id ? null :
                        <div className="form-input" style={{ flex: 1 }}>
                            <label for='id'>#</label>
                            <input value={id} type="text" id="id" readOnly style={{ flex: 1 }} />
                        </div>
                    }

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='placa'>Placa</label>
                        <input value={placa} onChange={(text) => setPlaca(text.target.value)} type="text" id="placa" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='capacidade'>Capacidade</label>
                        <input value={capacidade} onChange={(text) => setCapacidade(text.target.value)} type="text" id="capacidade" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='status'>Status</label>
                        <select id="status" value={status} onChange={handleSelect} >
                            <option value={true}>Ativo</option>
                            <option value={false}>Inativo</option>
                        </select>
                    </div>
                </div>

                <div className='form-row'>
                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='modelo'>Modelo</label>
                        <input value={modelo} onChange={(text) => setModelo(text.target.value)} type="text" id="modelo" style={{ flex: 1 }} />
                    </div>
                </div>

                <div className='form-row'>
                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='tipo'>Tipo da Carroceria</label>
                        <input value={tipo} onChange={(text) => setTipo(text.target.value)} type="text" id="tipo" style={{ flex: 1 }} />
                    </div>
                </div>

                <div className="form-input" style={{ flex: 1 }}>
                    <label for='motorista'>Motorista</label>
                    <select id="motorista" value={motorista} onChange={handleMotorista} >
                        {motoristas && motoristas.map((item, index) => (
                            <option key={index} value={item.motorista_id}>{item.motorista_id} - {item.nome}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}