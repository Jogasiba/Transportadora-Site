import './style.css'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";

export default function Login() {
    const navegacao = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const login = async () => {
        try {
            console.log(senha)
            const resposta = await axios.get(`http://localhost:5000/cliente/${email}/${senha}`);
            if (resposta) {
                const token = resposta.data;
                cookie.set('token', token);
                navegacao('/');
            }else{
                alert(`Login e/ou senha incorreta.`);
            }
        }
        catch (erro) {
            alert(`Algo deu errado: `, erro);
        }
    }

    return (
        <div className="container">
            <div className="titulo">
                <h1 className='titulo-text'>LOGIN</h1>

                <div className='sair' onClick={() => navegacao(`/clientes`)}>
                    <h1>Cadastre-se</h1>
                </div>

                <div className='salvar' onClick={login}>
                    <h1>Login</h1>
                </div>
            </div>

            <div className='form'>
                <div className='form-row'>
                    <div className="form-input" style={{ flex: 1 }}>
                        <label for='email'>Email</label>
                        <input value={email} onChange={(text) => setEmail(text.target.value)} type="text" id="email" />
                    </div>
                </div>

                <div className="form-input" style={{ flex: 1 }}>
                    <label for='senha'>Senha</label>
                    <input value={senha} onChange={(text) => setSenha(text.target.value)} type="password" id="senha" />
                </div>
            </div>
        </div>
    );
}