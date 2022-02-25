import path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Configuration = {
    mode: 'development',
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../server/public/assets'),
        filename: 'application.js'
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    { 
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                        },
                    }
                ]
            },
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: [
                                    path.join(__dirname, 'src/sass')
                                ],
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    tailwindcss(require('./tailwind.config.js')),
                                    autoprefixer()
                                ]
                            }
                        }
                    },
                ]
            },
            {
                type: 'asset',
                test: /\.(png|svg|jpe?g|gif)$/i
            }
        ]
    },
    plugins: [
        //new HtmlWebpackPlugin({ template: path.join(__dirname, 'src/index.html') }),
    ]
}

export default config;