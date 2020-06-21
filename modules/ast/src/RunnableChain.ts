import Runnable from './Runnable';

export default class RunnableChain implements Runnable<void> {
  private chain: Runnable<any>[];

  constructor(...chain: Runnable<any>[]) {
    this.chain = chain;
  }

  run() {
    this.chain.forEach(runnable => runnable.run());
  }
}
