import React from 'react';

class TopX extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jogadores: [],
            n: 10
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/jogadores/top-" + this.state.n)
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

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.componentDidMount();
        })
    }

    render() {
        const { jogadores, n } = this.state;
        return (
            <div>
                <h6>{this.state.mensagem || ''}</h6>
                <div>
                    <label>Digite quantos jogadores você quer ver no pódio: </label>

                    <input type="number" min="0" name="n" value={n} onChange={this.onChange}/>
                </div>
                <br/>
                <div>
                    <ul style={{"listStyle": 'none'}}>{ jogadores.map(jogador => <li>{ jogador.jogador + ' - Pontuação = ' + jogador.pontuacao }</li>) }</ul>
                </div>
            </div>
        );
    }
};

export default TopX;