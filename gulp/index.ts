import build from './build'
import { Log } from './types';
import { log } from './utils';

let namedTasks: [string, ((log: Log) => Promise<any>)][] = [
    ['build', build],
];

export const tasks = namedTasks.map(([name, fn]) => {
    let filteredLog = {};

    for (let level in log) {
        filteredLog[level] = log[level].bind(null, name)
    }

    let wrapped = fn.bind(null, filteredLog)

    Object.defineProperty(wrapped, 'name', { value: name })

    return wrapped
})
