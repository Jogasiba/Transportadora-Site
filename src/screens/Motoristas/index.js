import './style.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/delete-icon.png'
import { useNavigate } from "react-router-dom";
import EditIcon from '../../assets/edit-icon.png'

export default function Motoristas() {
    const navegacao = useNavigate();
    const [data, setData] = useState([])

    const buscar = async () => {
        let { data } = await axios.get(`http://localhost:5000/motorista`);
        setData(data);
    }

    const excluir = async (id) => {
        await axios.delete(`http://localhost:5000/motorista/${id}`)
        buscar();
    }

    useEffect(() => {
        buscar();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>MOTORISTAS</h1>

                <div className='add' onClick={() => navegacao('/formmotoristas')}>
                    <ion-icon name="add" style={{ color: '#FFF', fontSize: 50 }}></ion-icon>
                </div>
            </div>

            {data.length === 0 ?
                <h1>Não há motoristas cadastrados!</h1>
                :
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>CNH</th>
                            <th>Contato</th>
                            <th>Endereço ID</th>
                            <th>Caminhão ID</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.motorista_id}</td>
                                <td>{item.nome}</td>
                                <td>{item.cpf}</td>
                                <td>{item.cnh}</td>
                                <td>{item.contato}</td>
                                <td>{item.endereco_id}</td>
                                <td>{item.caminhao_id}</td>
                                <td><a href={`/formmotoristas/${item.motorista_id}`}><img src={EditIcon} style={{ width: 30 }} /></a></td>
                                <td><button onClick={() => excluir(item.motorista_id)}><img src={DeleteIcon} style={{ width: 30 }} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}