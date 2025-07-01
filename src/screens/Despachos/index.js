import './style.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/delete-icon.png'
import { useNavigate } from "react-router-dom";
import EditIcon from '../../assets/edit-icon.png'

export default function Despachos() {
    const navegacao = useNavigate();
    const [data, setData] = useState([])

    const buscar = async () => {
        let { data } = await axios.get(`http://localhost:5000/despacho`);
        setData(data);
    }

    const excluir = async (id) => {
        await axios.delete(`http://localhost:5000/despacho/${id}`)
        buscar();
    }

    useEffect(() => {
        buscar();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>DESPACHOS</h1>

                <div className='add' onClick={() => navegacao('/formdespachos')}>
                    <ion-icon name="add" style={{ color: '#FFF', fontSize: 50 }}></ion-icon>
                </div>
            </div>

            {data.length === 0 ?
                <h1>Não há despachos cadastrados!</h1>
                :
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Data Inicial</th>
                            <th>Data Fim</th>
                            <th>Status</th>
                            <th>Cidade</th>
                            <th>Carga ID</th>
                            <th>Motorista ID</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.despacho_id}</td>
                                <td>{item.dt_inic}</td>
                                <td>{item.dt_fim}</td>
                                <td>{item.status}</td>
                                <td>{item.cidade_despacho}</td>
                                <td>{item.carga_id}</td>
                                <td>{item.motorista_id}</td>
                                <td><a href={`/formdespachos/${item.despacho_id}`}><img src={EditIcon} style={{ width: 30 }} /></a></td>
                                <td><button onClick={() => excluir(item.despacho_id)}><img src={DeleteIcon} style={{ width: 30 }} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}