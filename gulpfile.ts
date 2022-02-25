import gulp from 'gulp'
import { tasks } from './gulp/index'

// setup all tasks
tasks.forEach(gulp.task)