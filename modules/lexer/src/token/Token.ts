import { DebugInfoProvider } from 'error';

export default abstract class Token extends DebugInfoProvider {
  public abstract value: any;
}
