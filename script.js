const gameFlowController = (() => {
  const submit = document.querySelector(".submitButton");
  const playerForm = document.querySelector(".player-info");
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    gameBoardController.createPlayers(
      playerForm.player1.value,
      playerForm.player2.value
    );
    playerForm.classList.toggle("none");
    displayController.displayPlayer(`${playerForm.player1.value}\'s Turn`);
  });
})();

const gameBoardController = (() => {
  let currentPlayerTurn = {};
  let nextPlayerTurn = {};

  let win = false;

  let gameBoardArray = new Array(3);
  for (let i = 0; i < gameBoardArray.length; i++) {
    gameBoardArray[i] = new Array(3).fill(" ");
  }
  const gameBoardObj = document.querySelectorAll(".gameboard > p");

  gameBoardObj.forEach((slot) =>
    slot.addEventListener("click", () => {
      updateBoard(slot);
    })
  );

  const createPlayers = (player1Name, player2Name) => {
    currentPlayerTurn = playerFactory(player1Name, "x");
    nextPlayerTurn = playerFactory(player2Name, "o");
  };

  const updateBoard = (slot) => {
    if (slot.textContent == " ") {
      slot.textContent = currentPlayerTurn.symbol;
      markArray(slot);
      win = tripleCheck(gameBoardArray, currentPlayerTurn.symbol);
      updateDisplay(win);
    }
  };

  const updateDisplay = (winState) => {
    if (winState == true) {
      displayController.displayWinner(currentPlayerTurn.name);
      const button = document.querySelector("button");
      button.classList.toggle("none");
    } else if (!arrayNotEmpty(gameBoardArray, " ")) {
      const pheader = document.querySelector(".player-header");
      pheader.textContent = "DRAW";
      const button = document.querySelector("button");
      button.classList.toggle("none");
    } else {
      turnSwitch(currentPlayerTurn, nextPlayerTurn);
      displayController.displayPlayer(`${currentPlayerTurn.name}\'s Turn`);
    }
  };

  const markArray = (domSection) => {
    let l = parseInt(domSection.dataset.row);
    let p = parseInt(domSection.dataset.column);
    gameBoardArray[l][p] = currentPlayerTurn.symbol;
    gameBoardArray.forEach((element) => console.log(element));
  };

  const tripleCheck = (array, symbol) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] + array[i][1] + array[i][2] == symbol + symbol + symbol) {
        console.log("YES");
        return true;
      }
    }
    for (let j = 0; j < array[0].length; j++) {
      if (array[0][j] + array[1][j] + array[2][j] == symbol + symbol + symbol) {
        console.log("YEP");
        return true;
      }
    }
    if (array[0][0] + array[1][1] + array[2][2] == symbol + symbol + symbol) {
      console.log("YES");
      return true;
    } else if (
      array[2][0] + array[1][1] + array[0][2] ==
      symbol + symbol + symbol
    ) {
      console.log("YEP");
      return true;
    } else {
      return false;
    }
  };

  const arrayNotEmpty = (array, match) => {
    return array.some((row) => row.includes(match));
  };

  const turnSwitch = (oldCurrentPlayer, oldNextPlayer) => {
    currentPlayerTurn = oldNextPlayer;
    nextPlayerTurn = oldCurrentPlayer;
  };
  return { createPlayers, currentPlayerTurn };
})();

const displayController = (() => {
  const displayPlayer = (playerObjName) => {
    const pheader = document.querySelector(".player-header");
    pheader.textContent = playerObjName;
  };

  const displayWinner = (winnerName) => {
    const pheader = document.querySelector(".player-header");
    pheader.textContent = `${winnerName} WINS`;
  };
  return { displayPlayer, displayWinner };
})();

const playerFactory = (name, symbol) => {
  return { name, symbol };
};
