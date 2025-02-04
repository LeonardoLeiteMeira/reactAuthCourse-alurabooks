import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCleanToken from "../../hooks/useCleanToken"
import useGetToken from "../../hooks/useGetToken"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import ModalLoginUsuario from "../ModalLoginUsuario"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'

const BarraNavegacao = () => {
    const [modalCadastroIsOpen, setModalCadastroIsOpen] = useState(false);
    const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(useGetToken()!==null)
    const navigator = useNavigate()

    const fecharModal = ()=>setModalCadastroIsOpen(false);
    const clearToken = useCleanToken();

    const aoEfetuarLogin = ()=>{
        setIsLoggedIn(true)
        setModalLoginIsOpen(false)
    }

    const logout = ()=>{
        setIsLoggedIn(false)
        clearToken()
        navigator("/")
    }


    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    <li>
                        <Link to="/">
                            Frontend
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Programação
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Infraestrutura
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Business
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Design e UX
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
        <ul className="acoes">
            {isLoggedIn?
                (
                    <>
                        <Link to={"/minha-conta"}>
                            Minha Conta
                        </Link>
                        <BotaoNavegacao 
                            texto="Logout"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario} 
                            onClick={logout}
                        />
                    </>
                ): (
                <>
                    <li>
                        <BotaoNavegacao 
                            texto="Login"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario} 
                            onClick={()=>setModalLoginIsOpen(true)}
                        />
                        <ModalLoginUsuario 
                            aberta={modalLoginIsOpen}
                            aoFechar={()=>setModalLoginIsOpen(false)}
                            aoEfetuarLogin={aoEfetuarLogin}
                        />  
                    </li>
                    <li>
                        <BotaoNavegacao
                            texto="Cadastrar-se"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={()=>setModalCadastroIsOpen(true)}
                        />
                        <ModalCadastroUsuario isOpen={modalCadastroIsOpen} closeModal={fecharModal} />
                    </li>
                </>    
            )}
        </ul>
    </nav>)
}

export default BarraNavegacao