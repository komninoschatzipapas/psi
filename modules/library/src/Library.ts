import { SymbolScope } from 'symbol';
import * as Write from './Write';
import * as WriteLn from './WriteLn';

export default function injectToScope(scope: SymbolScope) {
  scope.insert(WriteLn.symbol);
  scope.changeValue(WriteLn.symbol.name, WriteLn.dataType);
  scope.insert(Write.symbol);
  scope.changeValue(Write.symbol.name, Write.dataType);
}
