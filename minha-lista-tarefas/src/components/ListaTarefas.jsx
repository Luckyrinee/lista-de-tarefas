import { useState } from "react";

import './ListaTarefas.css';

function ListaTarefas() {
    //Armazena todas as tarefas
    const [tarefas, setTarefas] = useState([]);
    //Armazena o texto digitado para uma nova tarefa
    const [novaTarefa, setNovaTarefa] = useState('');
    //Controla o tipo de ordenação incerida
    const [ordenacao, setOrdenacao] = useState('normal');

    //Função para adicionar uma nova tarefa
    const adicionarTarefa = () => {
        //Verifica se a tarefa está vazia
        if (novaTarefa.trim() !== '') {
            //Cria um novo objeto para a tarefa
            const nova = {
                //Texto da tarefa
                texto: novaTarefa,
                //Data de criação da tarefa
                data: new Date(),
                //Conclusão da tarefa
                concluida: false
            };
            //Adiciona a nova tarefa na lista
            setTarefas([...tarefas, nova]);
            setNovaTarefa("");
        }
    };
    //Função para remover uma tarefa
    const removerTarefa = (data) => {
        //Filtra as tarefas e remove aquela q tem a mesma data
        setTarefas(tarefas.filter((tarefa) => tarefa.data !== data));
    };
    //Função que ordena as tarefas de acordo com a opção escolhida
    const ordenarTarefas = () => {
        if(ordenacao === 'a-z') {
            //Ordena as tarefas por ordem alfabética
            return [...tarefas].sort((a, b) => a.texto.localeCompare(b.texto));
        }

        if(ordenacao == 'data') {
            //Ordena da mais recente para a mais antiga
            return [...tarefas].sort((a, b) => b.data - a.data);
        }
        //Filtra apenas as tarefas concluidas
        if(ordenacao == 'concluida') {
            return tarefas.filter(tarefa => tarefa.concluida);
        }

        return tarefas;
    }
    //Função para alterar a conclusão de uma tarefa
    const alternarConclusao = (data) => {
        //Troca o valor de "concluida" da tarefa com a data correspondente
        const tarefasAtualizadas = tarefas.map((tarefa) => {
            if (tarefa.data === data) {
                //Troca o valor de "concluida"
                return { ...tarefa, concluida: !tarefa.concluida };
            }
            return tarefa;
        });
    
        setTarefas(tarefasAtualizadas);
    };
    

    return (
        <div>
            <h2 id="subtitulo">Lista de Tarefas</h2>
            <div id="div_adicionar">
            <input
             id="input_inicial"
             type='text'
             value={novaTarefa}
             onChange={(e) => setNovaTarefa(e.target.value)}
             placeholder='Digite uma nova tarefa'
             />
             <button id="botao_adicionar" onClick={adicionarTarefa}>Adicionar</button>
             {/*Combobox que armaneza as possíveis ordenações*/}
             <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                <option value="normal">Mais antigo</option>
                <option value="a-z">De A - Z</option>
                <option value="data">Mais recentes</option>
                <option value="concluida">Concluidas</option>
             </select>
             </div>

             <div id="div_lista">
             <ul>
                {ordenarTarefas().map((tarefa, indice) => (
                    <li key={indice} id={tarefa.concluida ? 'concluida' : ''}>
                        <div id="tarefa_texto_div">{tarefa.texto}</div>
                        <div id="botões_div">
                        <button id="botao_remover" onClick={() =>
                            removerTarefa(tarefa.data)}>X</button>
                            <button id="botao_concluir" onClick={() => alternarConclusao(tarefa.data)}>{tarefa.concluida ? 'Cancelar' : 'Concluir'}</button>
                            </div>
                            </li>
                
                ))}
             </ul>
            </div>
        </div>
    );
}

export default ListaTarefas;