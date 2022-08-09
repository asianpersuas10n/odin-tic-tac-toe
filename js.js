const game = (() => {
    //private
    let _turn = true;
    const _retrybtn = document.querySelector("#retrybtn")
    const _container = document.querySelector(".container");
    const _buttons = document.querySelector(".buttons");
    const _retryP = document.querySelector("#retry");
    const _start = document.querySelector("#start");
    const _mess = document.querySelector(".mess");
    let _gameboard = [null,null,null,null,null,null,null,null,null];
    let _playerOne;
    let _playerTwo;
    let _win = null;

    _buttons.addEventListener("click", () =>{
        _container.style.display = "grid";
        document.querySelector(".info").style.display = "none";
        _buttons.style.display = "none";
    });
    
    _start.addEventListener("click", () => {
        _playerOne = player(document.querySelector("#p1").value);
        _playerTwo = player(document.querySelector("#p2").value);
        _mess.innerHTML = `<p>Its ${_playerOne.name}'s Turn.`;
    });

    retrybtn.addEventListener("click", () => {
        _gameboard = [null,null,null,null,null,null,null,null,null];
        _win = null;
        _playerOne = null;
        _playerTwo = null;
        _turn = true;
        _mess.innerHTML = ``;
        document.querySelector("#p1").value = "";
        document.querySelector("#p2").value = "";
        _container.style.display = "none";
        document.querySelector(".info").style.display = "block";
        _buttons.style.display = "block";
        _retryP.style.display = "none";
        displayController();
    });
    
    const _winCheck = (board) => {
        let wins =  [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
        for(let [a, b, c] of wins) {
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return;
    }



        //public
    const displayController = () => {
        while(_container.childNodes.length >  0) {
            _container.removeChild(_container.lastChild);
            };
        _gameboard.forEach((x, index) => {
            gameToHtml(x, index);
        });
        function gameToHtml(xOrO, index) {
            const div = document.createElement("div");
            div.innerText = xOrO;
            _container.appendChild(div)
            div.addEventListener('click', () => {
                if((_gameboard[index] === "X") || (_gameboard[index] === "O")) {
                    return;
                };
                if(_turn === null) return;      //hacky way to stop the game after win
                _gameboard.splice(index, 1, _turn ? "X" : "O");
                _turn = _turn !== true;
                _mess.innerHTML = `<p>Its ${_turn ? _playerOne.name : _playerTwo.name}'s Turn.`;
                game.displayController();
                _win = _winCheck(_gameboard)
                if(!_gameboard.some(x => x === null)) {
                    _mess.innerHTML = `<p>Game Tied</p>`
                    _retryP.style.display = "block";
                    _turn = null;
                };
                if(_win) {
                    _mess.innerHTML = `<p>${_turn ? _playerTwo.name : _playerOne.name} wins!</p>`;
                    _retryP.style.display = "block";
                    _turn = null;
                };
              });
        }
    }
    return {
        displayController,
    }
})();

const player = (name) => {
    return {name,};
};

game.displayController();