import { DebugInfoProvider } from '@pascal-psi/error';

export default abstract class Token extends DebugInfoProvider {
  public abstract value: any;
}
