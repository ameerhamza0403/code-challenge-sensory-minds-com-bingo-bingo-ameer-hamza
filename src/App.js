import { useMemo, useState } from "react";
import "./App.css";
import ParticleContainer, { useExplosion } from "./particls";

const randomStrings = [
  "child noises in background",
  "hello, hello?",
  "i need to jump in another call",
  "can everyone go on mute",
  "could you please get closer to mic",
  "(load painfull echo)",
  "next slide please",
  "can we take this offline",
  "is hamza on call",
  "could you share this afterward",
  "can somebody grant rights",
  "can you email that to everyone",
  "sorry i had problem logging in",
  "(animals noise in background)",
  "sorry i didn't conf id",
  "i was having connection issues",
  "i'll have to get back to you",
  "who just joined",
  "do you see my screen",
  "let wait for hamza",
  "please wind up the call",
  "you will send the minutes",
  "sorry i was on mute",
  "can you repeat plz",
];
const genRand = (length) => {
  let nums = [...Array(length).keys()];
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
  return nums;
};

const combinations = {
  row1: [0, 1, 2, 3, 4],
  row2: [5, 6, 7, 8, 9],
  row3: [10, 11, 13, 14],
  row4: [15, 16, 17, 18, 19],
  row5: [20, 21, 22, 23, 24],
  leftDiagonal: [0, 6, 18, 24],
  rightDiagonal: [4, 8, 16, 20],
  col1: [0, 5, 10, 15, 20],
  col2: [1, 6, 11, 16, 21],
  col3: [2, 7, 17, 22],
  col4: [3, 8, 13, 18, 23],
  col5: [4, 9, 14, 19, 24],
};
const compareArrays = (current, target) => {
  return target.every((f) => current.includes(f));
};

const isCombinationSelected = {
  leftDiagonal: (items) => compareArrays(items, combinations["leftDiagonal"]),
  rightDiagonal: (items) => compareArrays(items, combinations["rightDiagonal"]),
  row1: (items) => compareArrays(items, combinations["row1"]),
  row2: (items) => compareArrays(items, combinations["row2"]),
  row3: (items) => compareArrays(items, combinations["row3"]),
  row4: (items) => compareArrays(items, combinations["row4"]),
  row5: (items) => compareArrays(items, combinations["row5"]),
  col1: (items) => compareArrays(items, combinations["col1"]),
  col2: (items) => compareArrays(items, combinations["col2"]),
  col3: (items) => compareArrays(items, combinations["col3"]),
  col4: (items) => compareArrays(items, combinations["col4"]),
  col5: (items) => compareArrays(items, combinations["col5"]),
};
function BingoTable(props) {
  const randomBingoGenerator = useMemo(() => {
    const randomBingos = genRand(24);
    const finalizedBingos = [];
    for (let index = 0; index < randomBingos.length; index++) {
      finalizedBingos.push({
        title: randomStrings[randomBingos[index]],
        id: finalizedBingos.length,
      });
      if (index === 11) {
        finalizedBingos.push({ title: "BINGO", id: finalizedBingos.length });
      }
    }
    return finalizedBingos;
  }, []);

  const [selectedCards, setSelectedCards] = useState([]);
  const [wonBingo, setWin] = useState([]);

  const selectCard = (card) => {
    if (card.id === 12) return;
    if (selectedCards.includes(card.id)) {
      const selected = selectedCards.filter((f) => f !== card.id);
      setSelectedCards(selected);
      decideReward(selected);

      return;
    }
    const selected = [...selectedCards, ...[card.id]];

    setSelectedCards(selected);
    decideReward(selected);
  };

  const decideReward = (selected) => {
    const winValues = checkCombinations(selected);
    if (winValues.some((e) => !wonBingo.includes(e))) explodeConfetti();
    setWin(winValues);
  };

  const checkCombinations = (selected) => {
    const bingoCombinations = [];
    // eslint-disable-next-line array-callback-return
    Object.keys(isCombinationSelected).map((key) => {
      if (isCombinationSelected[key](selected)) bingoCombinations.push(key);
    });

    return bingoCombinations;
  };

  const isCardBingoed = (card) => {
    const isBingoed = wonBingo.some((e) => {
      return combinations[e].includes(card);
    });
    return isBingoed;
  };

  const { isExploding, explodeConfetti } = useExplosion();

  return (
    <>
      {isExploding && <ParticleContainer />}
      <div>
        <div className="main-content">
          <div className="title">
            <h2>Bingo {props.player}</h2>
          </div>
          <div className="bingo-card">
            {randomBingoGenerator.map((e) => (
              <div
                key={e.id}
                onClick={() => selectCard(e)}
                className={`bingo-card__item ${
                  selectedCards?.includes(e.id) ? "active" : ""
                } ${isCardBingoed(e.id) ? "bingoed" : ""} ${
                  e.id === 12 ? "active bingoTile" : ""
                }`}
              >
                <span>{e.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const App = () => {
  return (
    <>
      <div className="container">
        <div className="row text-center"><h2>Bingo App Code Challenge by Ameer Hamza for sensory-minds</h2></div>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <BingoTable player={"Player 1"} />
          </div>
          <div className="col-lg-6 col-sm-12">
            <BingoTable player={"Player 2"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
