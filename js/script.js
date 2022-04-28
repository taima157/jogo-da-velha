const res = document.querySelector("#res")
const container_main = document.querySelector("#container")
const select_mode = document.querySelector("#select-mode")
const table = []
const plays = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
]
var turn = 'x'
var move, count = 0
var winner, win, mode, c

function randomTurn() {
    let num = Math.floor(Math.random() * (3 - 1) + 1)
    num == 1 ? turn = 'x' : turn = 'o'
}

function updateTurn(turn) {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`position${i}`).classList.remove('o', 'x')
    }        
    for (let i = 0; i < plays.length; i++) {
        let plays_remain = plays[i]
        if (!win) {
            document.getElementById(`position${plays_remain}`).classList.add(`${turn}`)
        }
    }
}

function play() {
    select_mode.style.visibility = "visible"
}

function selectMode(m) {
    document.querySelector("#jogo-da-velha").style.display = "block"
    document.querySelector("#menu-select").style.display = "none"
    if (m == '1p') {
        randomTurn()
        if (turn == 'o') {
            botMove()
        }
        for (var i = 1; i <= 9; i++) {
            document.getElementById(`position${i}`).setAttribute('onclick', `game1P(${i})`)
        }
    }
    else {
        for (var i = 1; i <= 9; i++) {
            document.getElementById(`position${i}`).setAttribute('onclick', `game2P(${i})`)
        }
    }
    m == '1p' ? mode = 1 : mode = 2
}

function back() {
    select_mode.style.visibility = "hidden"
    res.style.visibility = "hidden"
    document.querySelector("#jogo-da-velha").style.display = "none"
    document.querySelector("#menu-select").style.display = "block"
    mode = 0
    restart()
}

function restart() {
    for (var i = 1; i <= 9; i++) {
        document.getElementById(`position${i}`).innerHTML = ""
        document.getElementById(`position${i}`).style.backgroundColor = "gray"
        document.getElementById(`position${i}`).classList.remove('o')
        document.getElementById(`position${i}`).classList.add('x')
        if (mode == 1) {
            document.getElementById(`position${i}`).setAttribute('onclick', `game1P(${i})`)
        }
        else {
            document.getElementById(`position${i}`).setAttribute('onclick', `game2P(${i})`)
        }
        table.pop()
        plays[i - 1] = i
    }
    
    if (mode == 1) {
        randomTurn()
        if (turn == 'o') {
            botMove()
        }
    }
    else {
        turn = 'x'
    }

    count = 0
    win = false
    res.innerHTML = "."
    res.style.visibility = "hidden"
}

function verifyWin() {
    win_conditions.some(function(e) {
        if (table[e[0]] == turn && table[e[1]] == turn && table[e[2]] == turn) {
            win = true
            if (mode == 1) {
                turn == 'o' ? turn = 'x' : turn = 'o'
            }
        }
    })
    
    if (win) {
        for (var i = 1; i <= 9; i++) {
            document.getElementById(`position${i}`).removeAttribute('onclick')
            document.getElementById(`position${i}`).classList.remove('o', 'x')            
        }
        if (mode == 1) {
            turn == 'x' ? (winner = "Computador", c = 'lightskyblue') : (winner = "Jogador 1", c = 'lightgreen')
        }
        else {
            turn == 'x' ? (winner = "Jogador 1", c = 'lightgreen') : (winner = "Jogador 2", c = 'lightskyblue')
        }
        res.style.visibility = "visible"
        res.innerHTML = `O <span style="color: ${c}">${winner}</span> Venceu!`
    }
    else if (count == 9 && win != true) {
        res.style.visibility = "visible"
        res.innerHTML = `<span style="color: red;">Deu Velha!</span>`
    }
}

function setMove(v, m) {
    table[m - 1] = v
}

function game2P(x) {
    if (count != 9) {
        document.getElementById(`position${x}`).removeAttribute('onclick')
    }
    count++
    if (turn == 'x') {
        document.getElementById(`position${x}`).innerHTML = 'x'
        document.getElementById(`position${x}`).style.backgroundColor = "lightgreen"
        document.getElementById(`position${x}`).classList.remove(turn)
        plays.splice(plays.indexOf(x), 1)
        setMove(turn, x)
        verifyWin()
        turn = 'o'
    }
    else {
        document.getElementById(`position${x}`).innerHTML = 'o'
        document.getElementById(`position${x}`).style.backgroundColor = "lightskyblue"
        document.getElementById(`position${x}`).classList.remove(turn)
        plays.splice(plays.indexOf(x), 1)
        setMove(turn, x)
        verifyWin()
        turn = 'x'
    }
    updateTurn(turn)
}

function botMove() {
    var random_num = Math.floor(Math.random() * (plays.length - 2) + 1)
    var move_random = plays[random_num]
    setTimeout(() => game2P(move_random), 500)
}

function game1P(x) {
    game2P(x)
    if (win != true) {
        botMove()
    }
}