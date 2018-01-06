/*
 * Copyright 2017 Google Inc.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Card } from "../src/ui/card";
import ScoreCard from "../game/qwixx/scoreCard";

storiesOf("Card", module).add("basic", () => (
  <div style={{ padding: "50px" }}>
    <Card onHover={action("onHover")} onClick={action("onClick")} />
  </div>
));

let playerCard = {
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
};

storiesOf("ScoreCard", module).add("basic", () => (
  <div style={{ padding: "50px" }}>
    <ScoreCard
      playerCard={playerCard}
      numberClicked={(color, idx) => {
        console.log(color, idx);
      }}
    />
  </div>
));
