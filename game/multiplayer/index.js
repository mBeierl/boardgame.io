import React from 'react';
import Client from 'boardgame.io/client';
import { Qwixx } from '../qwixx/game';
import { Board } from '../qwixx';

const App = Client({
  game: Qwixx,
  board: Board,
  debug: false,
  multiplayer: true
});

export const Multiplayer = () => (
  <div>
    <div className="runner">
      <div className="run">
        <App gameID="multi" playerID="0" />
        &lt;App playerID=&quot;0&quot;/&gt;
      </div>
      <div className="run">
        <App gameID="multi" playerID="1" />
        &lt;App playerID=&quot;1&quot;/&gt;
      </div>
    </div>
  </div>
);
