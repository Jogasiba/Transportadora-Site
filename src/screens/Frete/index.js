import './style.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Frete() {
    const [frete, setFrete] = useState(-1);
    const [cep, setCep] = useState('');

    const buscar = async () => {
        try{
            let { data } = await axios.get(`http://localhost:5000/frete/89813000/${cep}`);
            setFrete(data);
        }
        catch(e){
            alert('CEP não encontrado!')
        }
    }

    // useEffect(() => {
    //     buscar();
    // }, [])

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>CALCULAR FRETE</h1>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: 25 }}>
                <input className='input-cep' value={cep} onChange={(text) => setCep(text.target.value)} />
                <div onClick={buscar} className='button'>
                    <h2>OK</h2>
                </div>
            </div>

            {frete == -1 ? null :
                <h2>Frete Calculado: R$ {frete.toFixed(2)}</h2>
            }
        </div>
    );
}