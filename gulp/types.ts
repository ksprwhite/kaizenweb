export type Log = {
    error: (...info: string[]) => void,
    warn: (...info: string[]) => void,
    info: (...info: string[]) => void,
    dir: (...info: string[]) => void,
}