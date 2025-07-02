import './style.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function Clientes() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    
    const [enderecos, setEnderecos] = useState([]);

    const buscarEnderecos = async () => {
        let { data } = await axios.get(`http://localhost:5000/endereco`);
        setEnderecos(data);

        if(data.length > 0){
            setEndereco(data[0].endereco_id);
        }
    }

    const handleEndereco = async (e) => {
        setEndereco(e.target.value);
    }

    const voltar = async (e) => {
        navegacao('/')
    }

    // const excluir = async (id) => {
    //     await axios.delete(`http://localhost:5000/cliente/${id}`)
    //     buscarEnderecos();
    // }

    const salvar = async () => {
        let body = {
            "nome": nome,
            "email": email,
            "senha": senha,
            "endereco_id": endereco == '' ? null : endereco,
        };

        if (id){
            await axios.put(`http://localhost:5000/cliente/${id}`, body);
        } 
        else{
            await axios.post(`http://localhost:5000/cliente`, body);
        }
        voltar();
    }

    useEffect(() => {
        buscarEnderecos();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>MINHA CONTA</h1>

                {!id ? null :
                    <div className='excluir' onClick={() => navegacao('/formclientes')}>
                        <h1>Excluir Conta</h1>
                    </div>
                }
                
                <div className='sair' onClick={() => navegacao('/')}>
                    <h1>Sair</h1>
                </div>

                <div className='add' onClick={() => salvar()}>
                    <h1>Salvar</h1>
                </div>
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
                        <label for='email'>Email</label>
                        <input value={email} onChange={(text) => setEmail(text.target.value)} type="text" id="email" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='senha'>Senha</label>
                        <input value={senha} onChange={(text) => setSenha(text.target.value)} type="password" id="senha" />
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
            </div>
        </div>
    );
}