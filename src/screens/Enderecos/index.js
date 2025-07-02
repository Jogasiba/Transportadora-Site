import './style.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/delete-icon.png'
import { useNavigate } from "react-router-dom";
import EditIcon from '../../assets/edit-icon.png'

export default function Enderecos() {
    const navegacao = useNavigate();
    const [data, setData] = useState([])

    const buscar = async () => {
        let { data } = await axios.get(`http://localhost:5000/endereco`);
        setData(data);
    }

    const excluir = async (id) => {
        await axios.delete(`http://localhost:5000/endereco/${id}`)
        buscar();
    }

    useEffect(() => {
        buscar();
    }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>ENDEREÇOS</h1>

                <div className='add' onClick={() => navegacao('/formenderecos')}>
                    <ion-icon name="add" style={{ color: '#FFF', fontSize: 50 }}></ion-icon>
                </div>
            </div>

            {
                data.length == 0 ?
                    <h1>Não há endereços cadastrados!</h1>
                    :
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>CEP</th>
                                <th>Rua</th>
                                <th>Numero</th>
                                <th>Complemento</th>
                                <th>Cidade</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.endereco_id}</td>
                                    <td>{item.cep}</td>
                                    <td>{item.rua}</td>
                                    <td>{item.numero}</td>
                                    <td>{item.complemento}</td>
                                    <td>{item.cidade}</td>
                                    <td><a href={`/formenderecos/${item.endereco_id}`}><img src={EditIcon} style={{ width: 30 }} /></a></td>
                                    <td><button onClick={() => excluir(item.endereco_id)}><img src={DeleteIcon} style={{ width: 30 }} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div>
    );
}