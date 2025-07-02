import './Form.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function FormDespachos() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [dt_inic, setDtIni] = useState('');
    const [dt_fim, setDtFim] = useState('');
    const [status, setStatus] = useState('');
    const [cidade, setCidade] = useState('');
    const [motorista, setMotorista] = useState(null);
    const [carga, setCarga] = useState(null);

    const [motoristas, setMotoristas] = useState([]);
    const [cargas, setCargas] = useState([]);

    const voltar = () => {
        navegacao('/despachos');
    };

    const buscarCargas = async () => {
        let { data } = await axios.get(`http://localhost:5000/carga`);
        setCargas(data);

        if(data.length > 0){
            setCarga(data[0].carga_id)
        }
    }

    const buscarMotoristas = async () => {
        let { data } = await axios.get(`http://localhost:5000/motorista`);
        setMotoristas(data);

        if(data.length > 0){
            setMotorista(data[0].motorista_id)
        }
    }

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:5000/despacho/${id}`);
        setDtIni(data.dt_inic);
        setDtFim(data.dt_fim);
        setStatus(data.status);
        setCidade(data.cidade_despacho);
        setMotorista(data.motorista_id);
        setCarga(data.carga_id);
    }

    const salvar = async () => {
        let body = {
            "dt_inic": dt_inic,
            "dt_fim": dt_fim,
            "status": status,
            "cidade_despacho": cidade,
            "motorista_id": motorista,
            "carga_id": carga,
        };

        console.log(body)

        if (id) {
            await axios.put(`http://localhost:5000/despacho/${id}`, body);
        }
        else {
            await axios.post(`http://localhost:5000/despacho`, body);
        }
        voltar();
    }

    const handleCarga = (e) => {
        setCarga(e.target.value)
    }

    const handleMotorista = (e) => {
        setMotorista(e.target.value)
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
        buscarCargas();
        buscarMotoristas();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>{id ? 'ALTERAÇÃO' : 'CADASTRO'} DE DESPACHO</h1>

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
                        <label for='dtIni'>Data Inicial</label>
                        <input value={dt_inic} onChange={(text) => setDtIni(text.target.value)} type="date" id="dtIni" style={{ flex: 1 }} />
                    </div>
                </div>

                <div className='form-row'>
                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='dtFim'>Data Final</label>
                        <input value={dt_fim} onChange={(text) => setDtFim(text.target.value)} type="date" id="dtFim" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='status'>Status</label>
                        <input value={status} onChange={(text) => setStatus(text.target.value)} type="text" id="status" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='cidade'>Cidade Despacho</label>
                        <input value={cidade} onChange={(text) => setCidade(text.target.value)} type="text" id="cidade" />
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

                <div className="form-input" style={{ flex: 1 }}>
                    <label for='carga'>Carga</label>
                    <select id="carga" value={carga} onChange={handleCarga} >
                        {cargas && cargas.map((item, index) => (
                            <option key={index} value={item.carga_id || 0}>{item.carga_id || 0} - {item.tipo_carga} - {item.status}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}