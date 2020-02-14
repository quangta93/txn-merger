import { expose } from 'comlink';
import { process, IProcess } from './process-csv';

export interface IBackgroundApi {
  process: IProcess;
}

expose({ process });
