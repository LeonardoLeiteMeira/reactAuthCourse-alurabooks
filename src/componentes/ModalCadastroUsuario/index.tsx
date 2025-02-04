import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
import { useState } from "react"
import http from "../Http"

import imagemPrincipal from './assets/login.png'

import './ModalCadastroUsuario.css'

interface Props{
    closeModal: ()=>void;
    isOpen:boolean;
}

const ModalCadastroUsuario = ({closeModal,isOpen}:Props) => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [cep, setCep] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConfirmada, setSenhaConfirmada] = useState('')

    const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const usuario = {
            nome,
            email,
            senha,
            endereco,
            cep,
            complemento
        }

        http.post("/public/registrar", usuario)
            .then((_)=>{
                alert("Usuario criado")
                setNome("")
                setEmail("")
                setEndereco("")
                setComplemento("")
                setCep("")
                setSenha("")
                setSenhaConfirmada("")
                closeModal()
            })
            .catch((error)=>{
                console.log(error)
                alert("Error ao criar usuario")
            })

        console.log(usuario)
        alert('Usuário foi cadastrado com sucesso!')
    }



    return (<AbModal 
        titulo="Cadastrar" 
        aberta={isOpen}
        aoFechar={() => closeModal()}    
    >
        <section className="corpoModalCadastro">
            <figure>
                <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
            </figure>
            <form onSubmit={aoSubmeterFormulario}>
                <AbCampoTexto 
                    label="Nome"
                    value={nome}
                    onChange={setNome}
                />
                <AbCampoTexto 
                    label="E-mail"
                    value={email}
                    onChange={setEmail}
                    type="email"
                />
                <AbCampoTexto 
                    label="Endereço"
                    value={endereco}
                    onChange={setEndereco}
                />
                <AbCampoTexto 
                    label="Complemento"
                    value={complemento}
                    onChange={setComplemento}
                />
                <AbCampoTexto 
                    label="CEP"
                    value={cep}
                    onChange={setCep}
                />
                <AbCampoTexto 
                    label="Senha"
                    value={senha}
                    onChange={setSenha}
                    type="password"  
                />
                <AbCampoTexto 
                    label="Confirmação da senha"
                    value={senhaConfirmada}
                    onChange={setSenhaConfirmada}
                    type="password"
                />
                <div className="acoes">
                    <AbBotao texto="Cadastrar"/>
                </div>
            </form>
        </section>
    </AbModal>)
}

export default ModalCadastroUsuario