import React from 'react';

class AdicionarPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jogador: undefined,
            pontuacao: undefined,
            mensagem: ''
        }
    }

    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    salvar = () => {
        const { pontuacao } = this.state;
        const jogador = {jogador: this.state.jogador, pontuacao: pontuacao}

        fetch("http://localhost:8080/adiciona-jogador", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(jogador)
        }).then(response => {
            response.text().then(data => {
                this.setState({ jogador: '', pontuacao: '', mensagem: data })
            });
        }).catch(e => { return e; })
    }

    render() {
        return (
            <div>
                <h6>{this.state.mensagem || ''}</h6>
                <div>
                    <label>Nome do Jogador: </label>
                    <input type="text" name="jogador" value={this.state.jogador} onChange={this.onChangeText}/>
                </div>
                <br/>
                <div>
                    <label>Pontuação do Jogador: </label>
                    <input type="number" name="pontuacao" value={this.state.pontuacao} onChange={this.onChangeText}/>
                </div>
                <div>
                    <button onClick={this.salvar}>Salvar</button>
                </div>
            </div>
        );
    }
};

export default AdicionarPlayer;