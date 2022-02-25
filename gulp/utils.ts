import chalk, { Chalk } from 'chalk'
import timestamp from 'time-stamp'


function logFunction(level: 'info' | 'error' | 'warn' | 'dir', taskName: string, ...info: string[]) {
    const colorLevel = {
        info: chalk.gray,
        error: chalk.red,
        warn: chalk.yellow,
        dir: (str) => str
    }[level]

    process.stdout.write([
        `[${chalk.gray(timestamp('HH:mm:ss'))}]`,
        `[${chalk.cyan(taskName)}]`
    ].join(' ') + ' ')

    info = info.map(i => colorLevel(i))
    console[level].apply(console, info)
}

export const log = {
    'info': logFunction.bind(null, 'info'),
    'error': logFunction.bind(null, 'error'),
    'warn': logFunction.bind(null, 'warn'),
    'dir': logFunction.bind(null, 'dir'),
}
