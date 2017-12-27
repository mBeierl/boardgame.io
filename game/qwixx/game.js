import Game from "boardgame.io/game";

function isPlayerFinished(playerCard) {
  let countFinished = 0;
  for (let colorKey in playerCard.finished) {
    if (playerCard.finished[colorKey]) countFinished++;
  }
  return countFinished >= 2;
}

function isPlayerFailed(playerCard) {
  return playerCard.fails >= 4;
}

function isGameOver(playerCards, playerStates) {
  if (!playerStates.every(p => p.isReady)) {
    // there's still a player who did not finish the dice
    return false;
  }

  playerCards.forEach(playerCard => {
    if (isPlayerFailed(playerCard)) {
      return true;
    } else if (isPlayerFinished(playerCard)) {
      return true;
    }
  });

  return false;
}

function getScores(playerCard) {
  const POINTS = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78];
  const FAIL_MALUS = 5;

  const colorScores = {
    red:
      POINTS[
        playerCard.red.reduce(
          (acc, val) => (acc + val.clicked ? 1 : 0),
          playerCard.finished.red ? 1 : 0 //start with 1 if finished
        )
      ],
    yellow:
      POINTS[
        playerCard.yellow.reduce(
          (acc, val) => (acc + val.clicked ? 1 : 0),
          playerCard.finished.yellow ? 1 : 0 //start with 1 if finished
        )
      ],
    green:
      POINTS[
        playerCard.green.reduce(
          (acc, val) => (acc + val.clicked ? 1 : 0),
          playerCard.finished.green ? 1 : 0 //start with 1 if finished
        )
      ],
    blue:
      POINTS[
        playerCard.blue.reduce(
          (acc, val) => (acc + val.clicked ? 1 : 0),
          playerCard.finished.blue ? 1 : 0 //start with 1 if finished
        )
      ]
  };

  return {
    ...colorScores,
    total:
      colorScores.red +
      colorScores.yellow +
      colorScores.green +
      colorScores.blue -
      playerCard.fails * FAIL_MALUS
  };
}

function getPlayerRanking(playerCards) {
  const playerScores = {};

  playerCards.forEach((playerCard, idx) => {
    const scores = getScores(playerCard);
    playerScores[idx] = scores.total;
  });

  const playerRanking = [];

  while (Object.keys(playerScores).length > 0) {
    let highestScore = -1;
    let highestPlayerId = -1;
    for (let playerKey in playerScores) {
      if (playerScores[playerKey] > highestScore) {
        highestScore = playerScores[playerKey];
        highestPlayerId = playerKey;
      }
    }
    playerRanking.push(highestPlayerId.toString());
    delete playerScores[highestPlayerId];
  }

  return playerScores;
}

function getRandomDiceNumber() {
  return Math.floor(Math.random() * 6 + 1);
}

export const Qwixx = Game({
  setup: numPlayers => ({
    dice: {
      white1: 0,
      white2: 0,
      red: 0,
      yellow: 0,
      green: 0,
      blue: 0
    },
    playerCards: Array(numPlayers).fill({
      red: Array(11)
        .fill(null)
        .map((e, idx) => ({ number: 2 + idx, clicked: false })),
      yellow: Array(11)
        .fill(null)
        .map((e, idx) => ({ number: 2 + idx, clicked: false })),
      green: Array(11)
        .fill(null)
        .map((e, idx) => ({ number: 12 - idx, clicked: false })),
      blue: Array(11)
        .fill(null)
        .map((e, idx) => ({ number: 12 - idx, clicked: false })),
      fails: 0,
      finished: {
        red: false,
        yellow: false,
        green: false,
        blue: false
      }
    }),
    playerStates: Array(numPlayers).fill({
      isReady: false, // whether the player is ready to move on to next dice
      hasClickedNumber: false // whether the player has clicked a number in this dice
    }),
    cells: Array(9).fill(null)
  }),

  moves: {
    rollDice(G, ctx) {
      // TODO assign random numbers to all dice that are currently in the game
      // check that all players either passed clicked a number
      console.log("rollDice", G, ctx);

      const rolledDice = {
        white1: getRandomDiceNumber(),
        white2: getRandomDiceNumber(),
        red: getRandomDiceNumber(),
        yellow: getRandomDiceNumber(),
        green: getRandomDiceNumber(),
        blue: getRandomDiceNumber()
      };

      return { ...G, dice: rolledDice };
    },
    pass(G, ctx, playerId) {
      // TODO check if this player was last to go into isReady state
      // -> yes? then end this dice and it's next player's turn
      console.log("pass", G, ctx, playerId);

      // create copies of the player's affected entries
      const playerIdx = parseInt(playerId);
      const playerState = { ...G.playerStates[playerIdx] };
      const playerCard = { ...G.playerCards[playerIdx] };

      // check whether the passing player is the currentPlayer
      // && whether the player has clicked a Number
      // then add 1 to his fails if he didn't click a number
      if (
        playerId === ctx.currentPlayer &&
        !G.playerStates[playerIdx].hasClickedNumber
      ) {
        playerCard.fails++;
      }
      // TODO set the player's ready state to true
      playerState.isReady = true;

      // add the modified players' state-entries back into the complete lists
      const playerCards = [...G.playerCards];
      playerCards[playerIdx] = playerCard;
      const playerStates = [...G.playerStates];
      playerStates[playerIdx] = playerState;

      return { ...G, playerCards, playerStates };
    },
    clickNumber(G, ctx, numberColor, numberIdx, playerId) {
      // TODO check if the player who clicked was able to click that number
      // TODO also automatically set playerState's isReady
      console.log("clickNumber", G, ctx, numberIdx, playerId);

      const playerIdx = parseInt(playerId);
      const playerState = { ...G.playerStates[playerIdx] };
      const playerCard = { ...G.playerCards[playerIdx] };

      playerCard[numberColor][numberIdx] = {
        ...playerCard[numberColor][numberIdx],
        clicked: true
      };
      console.log(
        `Clicked ${numberColor} number ${
          playerCard[numberColor][numberIdx].number
        }`
      );
      playerState.hasClickedNumber = true;

      const playerCards = [...G.playerCards];
      playerCards[playerIdx] = playerCard;
      const playerStates = [...G.playerStates];
      playerStates[playerIdx] = playerState;

      return { ...G, playerCards, playerStates };
    },
    clickCell(G, ctx, id) {
      const cells = [...G.cells];

      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      return { ...G, cells };
    }
  },

  victory: G => {
    return isGameOver(G.playerCards)
      ? getPlayerRanking(G.playerCards)[0]
      : null;
  }
});
