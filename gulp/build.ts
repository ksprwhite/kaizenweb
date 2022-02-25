import gulp from 'gulp'
import { Log } from './types'
import * as sourcesmaps from 'gulp-sourcemaps'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import path from 'path'

const CLIENT_PATH = path.join(__dirname, '../client')
const SERVER_PATH = path.join(__dirname, '../server')

export default async function(log: Log) {
    const tsconfig = path.join(CLIENT_PATH, 'tsconfig.json')
    const config = await import(path.join(CLIENT_PATH, 'webpack.config.ts')).then(m => m.default)
    const cwd = process.cwd()

    process.chdir(CLIENT_PATH)
    log.info(`Building client...`)
    log.info(`using tsconfig file from ${tsconfig}`)

    // check for watch
    const watch = process.argv.indexOf('--watch') !== -1

    if (watch) {
        process.env.TAILWIND_MODE = 'watch'
        config.watch = true
    }

    const buildPipe = () => {
        return gulp.src(path.join(CLIENT_PATH, '/src/**/*.{ts,tsx}'))
            .pipe(sourcesmaps.init())
            .pipe(sourcesmaps.write())
            .pipe(webpackStream(config))
            .pipe(sourcesmaps.write())
            .pipe(gulp.dest(path.resolve(SERVER_PATH, 'public/assets')))
    }

    const buildAsync = () => new Promise((resolve, reject) => {
        buildPipe()
            .on('end', resolve)
            .on('error', reject)
    })

    await buildAsync();
    process.chdir(cwd)
}
