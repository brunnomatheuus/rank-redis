import React from 'react';

class BuscaPorPosicao extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jogador: null,
            posicao: 10,
            mensagem: ''
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    buscar = () => {
        const { posicao } = this.state;

        fetch("http://localhost:8080/jogadores/posicao-" + posicao)
        .then(response => {
            response.json().then(data => {
                if(data.jogador.length !== 0)
                    this.setState({ jogador: data.jogador, mensagem: '' })
                else 
                    this.setState({ mensagem: 'Não existe jogador nesta posição!', jogador: null })
            });
        })
    }

    render() {
        const { jogador, posicao } = this.state;
        return (
            <div>
                <h6>{this.state.mensagem || ''}</h6>
                <div>
                    <label>Digite a posição que você deseja buscar algum jogador: </label>

                    <input type="number" min="0" name="posicao" value={posicao} onChange={this.onChange}/>

                    <button onClick={this.buscar}>Buscar</button>
                </div>
                <br/>
                {
                    jogador && 
                    <div>
                        <label>Jogador: {jogador[0]}</label>
                        <br/>
                        <label>Pontuação: {jogador[1]}</label>
                    </div>
                }
            </div>
        );
    }
};

export default BuscaPorPosicao;