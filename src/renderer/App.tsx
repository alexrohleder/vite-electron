import useLiveData from "./hooks/useLiveData";
import http from "./lib/http";

function App() {
  const timer = useLiveData("timer");
  const timerState = useLiveData("timerState");

  async function onChangeState() {
    // set loading state
    const _success = await http(timerState === "paused" ? "resume" : "pause");
    // set state based on success
  }

  return (
    <div>
      <p>The timer: {timer}s</p>
      <button onClick={onChangeState}>
        {timerState === "paused" ? "Resume" : "Pause"}
      </button>
    </div>
  );
}

export default App;
