import { AbBotao } from "ds-alurabooks"
import { useEffect, useState } from "react"
import http from "../../componentes/Http"
import useGetToken from "../../hooks/useGetToken"
import { IPedido } from "../../interfaces/IPedido"
import "./Pedidos.css"

const Pedidos = ()=>{
    const token = useGetToken()
    const [listaPedidos, setListaPedidos] = useState<Array<IPedido>>([])
    const currencyFormat = Intl.NumberFormat("pt-br",{style:"currency", currency:"BRL"});

    useEffect(()=>{
        http.get<Array<IPedido>>("/pedidos").then((resp)=>{
            let data:Array<IPedido> = resp.data
            setListaPedidos(data)
        }).catch((err)=>{
            console.log(err)
            alert("Erro ao carregar pedidos")
        })
    },[])

    const deletePedido = (pedidoId:number)=>{
        http.delete("/pedidos/"+pedidoId).then((_)=>{
            setListaPedidos(listaPedidos.filter((pedido)=>pedido.id!==pedidoId))
        }).catch((err)=>{
            console.log(err)
            alert("Erro ao deletar o pedido")
        })
    }

    return (
    <section className="pedidos">
        <h1>Meus pedidos</h1>
        

        {listaPedidos.map((pedido)=>(
                <div className="pedido" key={pedido.id}>
                    <ul>
                        <li>Pedido: <strong>{pedido.id}</strong></li>
                        <li>Data do pedido: <strong>{new Date(pedido.data).toLocaleDateString()}</strong></li>
                        <li>Valor total: <strong>{currencyFormat.format(pedido.total)}</strong></li>
                        <li>Entrega realizada em: <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong></li>
                        <li>
                            <AbBotao tipo="secundario"  texto="Excluir" onClick={()=>deletePedido(pedido.id)}></AbBotao>
                        </li>
                    </ul>
                    <AbBotao texto="Detalhes"/>
                </div>        
        ))}
    </section>
    )
}

export default Pedidos