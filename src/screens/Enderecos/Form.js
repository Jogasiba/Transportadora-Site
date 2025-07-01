import './Form.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function FormEnderecos() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');

    const voltar = () => {
        navegacao('/enderecos');
    };

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:5000/endereco/${id}`);
        setCep(data.cep);
        setRua(data.rua);
        setNumero(data.numero);
        setComplemento(data.complemento);
        setCidade(data.cidade);
    }

    const salvar = async () => {
        let body = {
            "cep": cep,
            "rua": rua,
            "numero": numero,
            "complemento": complemento,
            "cidade": cidade,
        };

        if (id){
            await axios.put(`http://localhost:5000/endereco/${id}`, body);
        } 
        else{
            await axios.post(`http://localhost:5000/endereco`, body);
        }
        voltar();
    }

    const buscaCep = async (cep) => {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();

        setRua(data.logradouro);
        setCidade(data.localidade);
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>{id ? 'ALTERAÇÃO' : 'CADASTRO'} DE ENDEREÇOS</h1>

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
                        <label for='cep'>CEP</label>
                        <input value={cep} onBlur={(text) => buscaCep(text.target.value)} onChange={(text) => setCep(text.target.value)} type="text" id="cep"  />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='rua'>Rua</label>
                        <input value={rua} onChange={(text) => setRua(text.target.value)} type="text" id="rua"  />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='numero'>Numero</label>
                        <input value={numero} onChange={(text) => setNumero(text.target.value)} type="text" id="numero"  />
                    </div>

                    <div className='form-row'>
                        <div className="form-input" style={{ flex: 1 }}>
                            <label for='complemento'>Complemento</label>
                            <input value={complemento} onChange={(text) => setComplemento(text.target.value)} type="text" id="complemento" style={{ flex: 1 }}  />
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='cidade'>Cidade</label>
                        <input value={cidade} onChange={(text) => setCidade(text.target.value)} type="text" id="cidade" style={{ flex: 1 }}  />
                    </div>
                </div>
            </div>
        </div>
    );
}