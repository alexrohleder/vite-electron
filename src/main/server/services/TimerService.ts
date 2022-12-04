import state from "../lib/state";

class TimerService {
  private interval: NodeJS.Timeout;

  constructor() {
    this.interval = setInterval(this.tick, 1000);
  }

  private tick() {
    const timer = state.get("timer") ?? 0;

    state.set("timer", timer + 1);
    state.set("timerState", "running");
  }

  async pause() {
    clearInterval(this.interval);

    state.set("timerState", "paused");
  }

  async resume() {
    this.interval = setInterval(this.tick, 1000);

    state.set("timerState", "running");
  }
}

export default TimerService;
