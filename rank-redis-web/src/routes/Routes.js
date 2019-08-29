import AdicionarPlayer from '../AdicionarPlayer';
import AlterarPontuacao from '../AlterarPontuacao';
import TopX from '../TopX';
import BuscaPorPosicao from "../BuscaPorPosicao";

const routes = [
    {
        path: "/",
        exact: true,
        component: AdicionarPlayer,
        nome: 'Adicionar Player'
    },
    {
        path: "/alterar-player/",
        component: AlterarPontuacao,
        nome: 'Alterar Pontuação'
    },
    {
        path: "/top-x/",
        component: TopX,
        nome: 'Top X'
    },
    {
        path: "/busca-por-posicao",
        component: BuscaPorPosicao,
        nome: 'Buscar Player por Posição'
    }
];

export default routes;