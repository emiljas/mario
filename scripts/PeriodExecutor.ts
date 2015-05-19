class PeriodExecutor {
  private periodTimeInMilliseconds: number;
  private actions: any[];
  private periodCount: number;

  constructor(periodTimeInMilliseconds: number, ...actions: any[]){
    this.periodTimeInMilliseconds = periodTimeInMilliseconds;
    this.actions = actions;
    this.periodCount = this.actions.length;
  }

  public execute(timeInMilliseconds): void {
    var currentPeriodNumber = Math.floor((timeInMilliseconds / this.periodTimeInMilliseconds) % this.periodCount);
    for(var periodNumber = 0; periodNumber < this.periodCount; periodNumber++) {
      if(currentPeriodNumber == periodNumber) {
        this.actions[periodNumber]();
        break;
      }
    }
  }
}

export = PeriodExecutor;
