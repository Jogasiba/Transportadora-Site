import './style.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/delete-icon.png'
import { useNavigate } from "react-router-dom";
import EditIcon from '../../assets/edit-icon.png'

export default function Caminhoes() {
    const navegacao = useNavigate();
    const [data, setData] = useState([])

    const buscar = async () => {
        let { data } = await axios.get(`http://localhost:5000/caminhao`);
        setData(data);
    }

    const excluir = async (id) => {
        await axios.delete(`http://localhost:5000/caminhao/${id}`)
        buscar();
    }

    useEffect(() => {
        buscar();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>CAMINHÕES</h1>

                <div className='add' onClick={() => navegacao('/formcaminhoes')}>
                    <ion-icon name="add" style={{ color: '#FFF', fontSize: 50 }}></ion-icon>
                </div>
            </div>

            {data.length == 0 ?
                <h1>Não há caminhões cadastrados!</h1>
                :
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Capacidade</th>
                            <th>Status</th>
                            <th>Tipo de Carroceria</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.caminhao_id}</td>
                                <td>{item.placa}</td>
                                <td>{item.modelo}</td>
                                <td>{item.capacidade}</td>
                                <td>{item.status ? "Ativo" : "Inativo"}</td>
                                <td>{item.tp_carroceria}</td>
                                <td><a href={`/formcaminhoes/${item.caminhao_id}`}><img src={EditIcon} style={{ width: 30 }} /></a></td>
                                <td><button onClick={() => excluir(item.caminhao_id)}><img src={DeleteIcon} style={{ width: 30 }} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}