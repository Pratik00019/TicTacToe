import { useEffect, useRef, useState } from "react";
import "./App.css";
import isWon from "./isWon";
import Modal from "./components/Modal";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [start, setStart] = useState(0);

  const count = useRef(0);

  const [valueOfPlayer1, setvalueOfPlayer1] = useState(0);
  const [valueOfPlayer2, setvalueOfPlayer2] = useState(0);
  const [draw, setDraw] = useState(0);

  useEffect(() => {
    console.log("count", count.current);
    if (isWon(board)) {
      setModalMessage(() => `Player ${turn === "X" ? "O" : "X"} has won!`);
      setModalVisible(true);

      if (turn === "O") setvalueOfPlayer1((prev) => prev + 1);
      else setvalueOfPlayer2((prev) => prev + 1);
      setBoard(Array(9).fill(null));
      count.current = 0;
    } else if (count.current === 9) {
      setModalMessage("It's a Draw!");
      setModalVisible(true);
      setDraw(draw + 1);
      setBoard(Array(9).fill(null));
      count.current = 0;
    }
  }, [board]);

  const handleClick = (e, idx) => {
    if (board[idx]) return;

    const newBoard = [...board];
    newBoard[idx] = turn;
    setBoard(() => {
      return newBoard;
    });

    setTurn(() => (turn === "X" ? "O" : "X"));

    count.current = count.current + 1;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setvalueOfPlayer1(0);
    setvalueOfPlayer2(0);
    setDraw(0);
    setStart(0);
    count.current = 0;
  };

  const closeModal = () => {
    setModalVisible(false);
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  return (
    <>
      <div className="mainContainer">
        <div className="ticTacToeContainer">
          <div className="ticToe">tic.</div>
          <div className="tac">tac.</div>
          <div className="ticToe">toe.</div>
        </div>
        <div className="gameContainer">
          <div className="displayBoxContainer">
            <div className="displayBox1">
              <div className="displayBox1Inside">
                <div className="displayBox1Typogrpahy">PLAYER X</div>
                <div className="displayBox1Value1">{valueOfPlayer1}</div>
              </div>
            </div>

            <div className="displayBox2">
              <div className="displayBox1Inside">
                <div className="displayBox1Typogrpahy">DRAW</div>
                <div className="displayBox1Value1">{draw}</div>
              </div>
            </div>

            <div className="displayBox3">
              <div className="displayBox1Inside">
                <div className="displayBox1Typogrpahy">PLAYER Y</div>
                <div className="displayBox1Value1">{valueOfPlayer2}</div>
              </div>
            </div>
          </div>

          <div className="gridContainer">
            {board.map((value, index) => (
              <button
                key={index}
                className={`gridBox ${
                  start === 0
                    ? "disabled"
                    : value === "X"
                    ? "xStyle"
                    : value === "O"
                    ? "oStyle"
                    : ""
                }`}
                onClick={(e) => handleClick(e, index)}
                disabled={start === 0 ? true : false}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="buttonsContainer">
            <button className="startButton" onClick={() => setStart(1)}>
              Start
            </button>
            <button className="startButton" onClick={handleReset}>
              Reset
            </button>
          </div>

          <Modal
            isVisible={isModalVisible}
            onClose={closeModal}
            message={modalMessage}
          />
        </div>
      </div>
    </>
  );
}

export default App;
