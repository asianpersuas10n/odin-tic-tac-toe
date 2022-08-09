const game = (() => {
    let _turn = true;
    const winCheck = (board) => {
        let wins =  [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
        for(let [a, b, c] of wins) {
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return;
    }
    let gameboard = [null,null,null,null,null,null,null,null,null];
    const container = document.querySelector(".container");
    const displayController = () => {
        while(container.childNodes.length >  0) {
            container.removeChild(container.lastChild);
            };
        gameboard.forEach((x, index) => {
            gameToHtml(x, index);
        });
        function gameToHtml(xOrO, index) {
            _index = index
            const div = document.createElement("div");
            div.innerText = xOrO;
            container.appendChild(div)
            div.addEventListener('click', () => {
                if((gameboard[index] === "X") || (gameboard[index] === "O")) {
                    return;
                };
                if(_turn === null) return;
                gameboard.splice(index, 1, _turn ? "X" : "O");
                _turn = _turn !== true;
                game.displayController();
                let win = game.winCheck(gameboard);
                if(win) {
                    _turn = null;
                    document.querySelector(".mess").innerHTML = `<p>${win} wins!</p>`;
                };
              });
        }
    }
    return {
        gameboard,
        displayController,
        winCheck,
    }
})();

const Player = (name) => {
    this.name = name;
}

game.displayController();