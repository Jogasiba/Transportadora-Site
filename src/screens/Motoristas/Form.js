import './Form.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function FormMotoristas() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnh, setCnh] = useState('');
    const [contato, setContato] = useState('');
    const [endereco, setEndereco] = useState('');
    const [caminhao, setCaminhao] = useState('');

    const [enderecos, setEnderecos] = useState([]);
    const [caminhoes, setCaminhoes] = useState([]);

    const voltar = () => {
        navegacao('/motoristas');
    };

    const buscarCaminhoes = async () => {
        let { data } = await axios.get(`http://localhost:5000/caminhao`);
        setCaminhoes(data);

        if(data.lenght > 0){
            setCaminhao(data[0].caminhao_id)
        }
    }

    const buscarEnderecos = async () => {
        let { data } = await axios.get(`http://localhost:5000/endereco`);
        setEnderecos(data);

        if(data.lenght > 0){
            setEndereco(data[0].endereco_id)
        }
    }

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:5000/motorista/${id}`);
        setNome(data.nome);
        setCpf(data.cpf);
        setCnh(data.cnh);
        setContato(data.contato);
        setEndereco(data.endereco_id);
        setCaminhao(data.caminhao_id);
    }

    const salvar = async () => {
        let body = {
            "nome": nome,
            "cpf": cpf,
            "cnh": cnh,
            "contato": contato,
            "endereco_id": endereco,
            "caminhao_id": caminhao,
        };

        if (id) {
            await axios.put(`http://localhost:5000/motorista/${id}`, body);
        }
        else {
            await axios.post(`http://localhost:5000/motorista`, body);
        }
        voltar();
    }

    const handleCaminhao = (e) => {
        setCaminhao(e.target.value)
    }

    const handleEndereco = (e) => {
        setEndereco(e.target.value)
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
        buscarCaminhoes();
        buscarEnderecos();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>{id ? 'ALTERAÇÃO' : 'CADASTRO'} DE MOTORISTAS</h1>

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
                        <label for='nome'>Nome</label>
                        <input value={nome} onChange={(text) => setNome(text.target.value)} type="text" id="nome" style={{ flex: 1 }} />
                    </div>
                </div>

                <div className='form-row'>
                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='cpf'>CPF</label>
                        <input value={cpf} onChange={(text) => setCpf(text.target.value)} type="text" id="cpf" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='cnh'>CNH</label>
                        <input value={cnh} onChange={(text) => setCnh(text.target.value)} type="text" id="cnh" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='contato'>Contato</label>
                        <input value={contato} onChange={(text) => setContato(text.target.value)} type="text" id="contato" />
                    </div>
                </div>

                <div className="form-input" style={{ flex: 1 }}>
                    <label for='endereco'>Endereço</label>
                    <select id="endereco" value={endereco} onChange={handleEndereco} >
                        {enderecos && enderecos.map((item, index) => (
                            <option key={index} value={item.endereco_id}>{item.endereco_id} - {item.rua} - {item.numero}</option>
                        ))}
                    </select>
                </div>

                <div className="form-input" style={{ flex: 1 }}>
                    <label for='caminhao'>Caminhão</label>
                    <select id="caminhao" value={caminhao} onChange={handleCaminhao} >
                        {caminhoes && caminhoes.map((item, index) => (
                            <option key={index} value={item.caminhao_id}>{item.caminhao_id} - {item.placa} - {item.modelo}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}