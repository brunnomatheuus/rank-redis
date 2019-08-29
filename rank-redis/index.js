const express = require('express')
const redis = require('redis')
const client = redis.createClient({
    host: 'db',
    port: 6379
})
const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors())
const port = 8080

client.on('connect', () => {
  console.log('Redis is ready');
});

client.on('error', (e) => {
  console.log('Redis error', e);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/adiciona-jogador', (req, res) => {
    console.log('Recebendo requisição com os parametros: ', req.body)
    if(!req.body.jogador || !req.body.pontuacao) {
        res.status(400).send('Erro, nome do jogador ou pontuação não informada!');
    } else {
        client.zadd('jogadores:rank', 'NX', req.body.pontuacao, req.body.jogador, (err, result) => {
            if(result > 0) {
                res.status(200).send('Jogador adicionado com sucesso');
            } else {
                res.status(400).send('Jogador já existente, para fazer alterações em sua pontuação utilize o menu de edição de pontuação!')
            }
        });
    }
})

app.post('/altera-pontuacao', (req, res) => {

    client.zscore('jogadores:rank', req.body.jogador, function(err, result) {
        const pontuacaoFinal = Number(result);

        if(!req.body.jogador || !req.body.pontuacao) {
            res.status(400).send('Erro, nome do jogador ou pontuação à ser adicionada não informada!');
        } else if(pontuacaoFinal + Number(req.body.pontuacao) < 0) {
            res.status(400).send('Erro, pontuação não pode ficar negativada!');
        } else {
            client.zadd('jogadores:rank', 'XX', 'INCR', req.body.pontuacao, req.body.jogador, (err, result) => {
                res.status(200).send('Sucesso! Pontuação do jogador ' + req.body.jogador + ' alterada para ' + result + ' pontos!');
            });
        }
    })
})

app.get('/jogadores', (req, res) => {
    client.zrange('jogadores:rank', 0, -1, 'WITHSCORES', (err, result) => {
        const jogadores = {jogadores: result};

        res.json(jogadores);
    });
})

app.get('/jogadores/top-:valor', (req, res) => {
    const value = req.params.valor;
    client.zrange('jogadores:rank', 0, value-1, 'WITHSCORES', (err, result) => {
        const jogadores = {jogadores: result};

        res.json(jogadores);
    });
})

app.get('/jogadores/posicao-:valor', (req, res) => {
    const value = req.params.valor;

    if(Math.sign(value - 1) < 0) {
        res.status(400).send('Posição informada está fora do range, digite uma posição válida!')
    } else {
        client.zrange('jogadores:rank', value-1, value-1, 'WITHSCORES', (err, result) => {
            const jogador = {jogador: result};
    
            res.json(jogador);
        });
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))