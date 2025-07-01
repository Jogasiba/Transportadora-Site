import './style.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/delete-icon.png'
import { useNavigate } from "react-router-dom";
import EditIcon from '../../assets/edit-icon.png'

export default function Cargas() {
    const navegacao = useNavigate();
    const [data, setData] = useState([])

    const buscar = async () => {
        let { data } = await axios.get(`http://localhost:5000/carga`);
        setData(data);
    }

    const excluir = async (id) => {
        await axios.delete(`http://localhost:5000/carga/${id}`)
        buscar();
    }

    useEffect(() => {
        buscar();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>CARGAS</h1>

                <div className='add' onClick={() => navegacao('/formcargas')}>
                    <ion-icon name="add" style={{ color: '#FFF', fontSize: 50 }}></ion-icon>
                </div>
            </div>

            {data.length === 0 ?
                <h1>Não há cargas cadastradas!</h1>
                :
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Origem</th>
                            <th>Destino</th>
                            <th>Peso</th>
                            <th>Tipo da Carga</th>
                            <th>Status</th>
                            <th>Cliente ID</th>
                            <th>Endereço ID</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.carga_id}</td>
                                <td>{item.origem}</td>
                                <td>{item.destino}</td>
                                <td>{item.peso}</td>
                                <td>{item.tipo_carga}</td>
                                <td>{item.status}</td>
                                <td>{item.cliente_id}</td>
                                <td>{item.endereco_id}</td>
                                <td><a href={`/formcargas/${item.carga_id}`}><img src={EditIcon} style={{ width: 30 }} /></a></td>
                                <td><button onClick={() => excluir(item.carga_id)}><img src={DeleteIcon} style={{ width: 30 }} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}