import React from 'react';

class AlterarPontuacao extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jogadores: [],
            jogador: undefined,
            pontuacao: undefined,
            mensagem: ''
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/jogadores")
        .then(response => {
            response.json().then(data => {
                const jogadores = data.jogadores
                let jogadoresRetorno = [];
                for(let i = 0; i < jogadores.length; i += 2) {
                    jogadoresRetorno.push({"jogador": jogadores[i], "pontuacao": jogadores[i + 1]})
                }

                this.setState({ jogadores: jogadoresRetorno, jogador: jogadoresRetorno[0]['jogador'] })
            });
        })
    }

    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    salvar = () => {
        const { pontuacao } = this.state;
        const jogador = {jogador: this.state.jogador, pontuacao: pontuacao}

        fetch("http://localhost:8080/altera-pontuacao", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(jogador)
        }).then(response => {
            response.text().then(data => {
                this.componentDidMount();
                this.setState({ jogador: '', pontuacao: '', mensagem: data })
            });
        }).catch(e => { return e; })
    }

    render() {
        const { jogadores, jogador, pontuacao } = this.state;
        return (
            <div>
                <h6>{this.state.mensagem || ''}</h6>
                <div>
                    <label>Jogador: </label>

                    <select name="jogador" value={jogador} onChange={this.onChangeText}>
                        {
                            jogadores && jogadores.map((jogador, index) => {
                                return <option key={index} value={jogador.jogador}>{ jogador.jogador + ' - Pontuação = ' + jogador.pontuacao }</option>
                            })
                        }
                    </select>
                </div>
                <br/>
                <div>
                    <label>Pontuação à ser adicionada ou removida (Utilize - para identificar a remoção, ex.: -10): </label>
                    <input type="number" name="pontuacao" value={pontuacao} onChange={this.onChangeText}/>
                </div>
                <div>
                    <button onClick={this.salvar}>Salvar</button>
                </div>
            </div>
        );
    }
};

export default AlterarPontuacao;