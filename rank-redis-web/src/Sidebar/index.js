import React from 'react';
import BurgerMenu from 'react-burger-menu';
import './styles.css';

export default class Sidebar extends React.Component{
    constructor (props) {
        super(props);
    }

    getItems() {
        let items;

        items = [
            <h2 key="0"><i className="fa fa-fw fa-inbox fa-2x" /><span>Rank Players</span></h2>,
            <a key="0" href="/"><i className="fa fa-fw fa-user" /><span> Adicionar Player</span></a>,
            <a key="1" href="/alterar-player/"><i className="fa fa-fw fa-bar-chart" /><span> Alterar Pontuação de Player</span></a>,
            <a key="2" href="/top-x/"><i className="fa fa-fw fa-industry" /><span> Top X</span></a>,
            <a key="2" href="/busca-por-posicao/"><i className="fa fa-fw fa-industry" /><span> Buscar por posição</span></a>,
        ];

        return items;
    }

    getMenu() {
        const Menu = BurgerMenu['push'];

        return (
            <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
                {this.getItems()}
            </Menu>
        );
    }

    renderMenu = () => {
        return (
            <div id="outer-container" style={{height: '100%'}}>
                {this.getMenu()}
            </div>
        )
    };

    render() {
        return this.renderMenu();
    }
}
