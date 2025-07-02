import './Form.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function FormCargas() {
    const navegacao = useNavigate();
    const { id } = useParams();
    const [origem, setOrigem] = useState('');
    const [destino, setDestino] = useState('');
    const [peso, setPeso] = useState('');
    const [tipo_carga, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [cliente_id, setCliente] = useState(null);
    const [endereco_id, setEndereco] = useState(null);

    const [produto, setProduto] = useState('');

    const [enderecos, setEnderecos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const voltar = () => {
        navegacao('/cargas');
    };

    const buscarClientes = async () => {
        let { data } = await axios.get(`http://localhost:5000/cliente`);
        setClientes(data);

        if(data.length > 0){
            setCliente(data[0].cliente_id)
        }
    }

    const buscarEnderecos = async () => {
        let { data } = await axios.get(`http://localhost:5000/endereco`);
        setEnderecos(data);

        if(data.length > 0){
            setEndereco(data[0].endereco_id)
        }
    }

    const buscarProduto = async () => {
        let { data } = await axios.get(`http://localhost:4000/produto`);
        setProdutos(data);

        if(data.length > 0){
            setProduto(data[0].endereco_id)
        }
    }

    const selecionar = async () => {
        let { data } = await axios.get(`http://localhost:5000/carga/${id}`);
        setOrigem(data.origem);
        setDestino(data.destino);
        setPeso(data.peso);
        setTipo(data.tipo_carga);
        setStatus(data.status);
        setCliente(data.cliente_id);
        setEndereco(data.endereco_id);
    }

    const salvar = async () => {
        let body = {
            "origem": origem,
            "destino": destino,
            "peso": peso,
            "tipo_carga": tipo_carga,
            "status": status,
            "cliente_id": cliente_id,
            "endereco_id": endereco_id,
        };

        console.log(body)

        if (id) {
            await axios.put(`http://localhost:5000/carga/${id}`, body);
        }
        else {
            await axios.post(`http://localhost:5000/carga`, body);
        }
        voltar();
    }

    const handleCliente = (e) => {
        setCliente(e.target.value)
    }

    const handleEndereco = (e) => {
        setEndereco(e.target.value)
    }

    const handleProduto = (e) => {
        setProduto(e.target.value)
    }

    useEffect(() => {
        if (id) {
            selecionar();
        }
        buscarClientes();
        buscarEnderecos();
        // buscarProduto();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>{id ? 'ALTERAÇÃO' : 'CADASTRO'} DE CARGAS</h1>

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
                        <label for='origem'>Origem</label>
                        <input value={origem} onChange={(text) => setOrigem(text.target.value)} type="text" id="origem" style={{ flex: 1 }} />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='destino'>Destino</label>
                        <input value={destino} onChange={(text) => setDestino(text.target.value)} type="text" id="destino" />
                    </div>
                </div>

                <div className="form-input" style={{ flex: 1 }}>
                    <label for='produto'>Produto</label>
                    <select id="produto" value={status} onChange={handleProduto} >
                        {produtos && produtos.map((item, index) => (
                            <option key={index} value={item.produto_id}>{item.produto_id} - {item.nome}</option>
                        ))}
                    </select>
                </div>

                <div className='form-row'>
                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='peso'>Peso</label>
                        <input value={peso} onChange={(text) => setPeso(text.target.value)} type="text" id="peso" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='tipo_carga'>Tipo de Carga</label>
                        <input value={tipo_carga} onChange={(text) => setTipo(text.target.value)} type="text" id="tipo_carga" />
                    </div>

                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='status'>Status</label>
                        <input value={status} onChange={(text) => setStatus(text.target.value)} type="text" id="status" />
                    </div>
                </div>

                <div className="form-input" style={{ flex: 1 }}>
                    <label for='endereco'>Endereço</label>
                    <select id="endereco" value={endereco_id} onChange={handleEndereco} >
                        {enderecos && enderecos.map((item, index) => (
                            <option key={index} value={item.endereco_id}>{item.endereco_id} - {item.rua} - {item.numero}</option>
                        ))}
                    </select>
                </div>

                <div className="form-input" style={{ flex: 1 }}>
                    <label for='cliente'>Cliente</label>
                    <select id="cliente" value={cliente_id} onChange={handleCliente} >
                        {clientes && clientes.map((item, index) => (
                            <option key={index} value={item.cliente_id}>{item.cliente_id} - {item.nome}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}