import { MutableRefObject } from "react";

interface ICounterServiceConstructor {
  handleIncrease: () => void;
  handleDecrease: () => void;
  value: number;
  max?: number;
  min?: number;
  target: MutableRefObject<HTMLSpanElement | null>;
}

export class CounterService {
  public value: number;
  private target: MutableRefObject<HTMLSpanElement | null>;
  public max?: number;
  public min?: number;
  // private handleChange: (value: number) => void;
  private handleIncrease: () => void;
  private handleDecrease: () => void;

  constructor({
    handleIncrease,
    handleDecrease,
    value = 0,
    target,
    max,
    min,
  }: ICounterServiceConstructor) {
    this.value = value;
    this.target = target;
    this.max = max;
    this.min = min;
    this.handleIncrease = handleIncrease;
    this.handleDecrease = handleDecrease;

    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  public increase(): void {
    if (!this.target.current) {
      return;
    }

    // if max exist and curent value less than max, then increase value
    if (typeof this.max === "number" && this.value < this.max) {
      this.handleIncrease();
    }

    // if max not exist  then increase value
    if (typeof this.max !== "number") {
      this.handleIncrease();
    }
  }

  public decrease(): void {
    if (!this.target.current) {
      return;
    }

    // if min exist and curent value greater than min, then decrease value
    if (typeof this.min === "number" && this.value > this.min) {
      this.handleDecrease();
    }

    // if min not exist , then decrease value
    if (typeof this.min !== "number") {
      this.handleDecrease();
    }
  }
}
