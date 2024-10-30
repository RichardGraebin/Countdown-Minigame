import { useState, useRef } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState();
  const enteredPlayerName = useRef();

  function handleClick() {
    setPlayerName(enteredPlayerName.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ? playerName : "unknow entity"}</h2>
      <p>
        <input ref={enteredPlayerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
