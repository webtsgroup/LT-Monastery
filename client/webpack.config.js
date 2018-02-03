const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');

const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin, UglifyJsPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');
const JoinPlugin = require("join-webpack-plugin");
const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","scripts","styles","vendor","main"];
const minimizeCss = true;
const baseHref = "";
const deployUrl = "";
const merge = require("merge");
const env = function() {
  let env = '';
  if (process.env.NODE_ENV === 'stg' || process.env.NODE_ENV === 'prod') {
    env = '.' + process.env.NODE_ENV;
  }
  return env;
}
const postcssPlugins = function () {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
    const minimizeOptions = {
        autoprefixer: false,
        safe: true,
        mergeLonghand: false,
        discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
    };
    return [
        postcssUrl({
            url: (URL) => {
                // Only convert root relative URLs, which CSS-Loader won't process into require().
                if (!URL.startsWith('/') || URL.startsWith('//')) {
                    return URL;
                }
                if (deployUrl.match(/:\/\//)) {
                    // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                    return `${deployUrl.replace(/\/$/, '')}${URL}`;
                }
                else if (baseHref.match(/:\/\//)) {
                    // If baseHref contains a scheme, include it as is.
                    return baseHref.replace(/\/$/, '') +
                        `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
                else {
                    // Join together base-href, deploy-url and the original URL.
                    // Also dedupe multiple slashes into single ones.
                    return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
            }
        }),
        autoprefixer(),
    ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

module.exports = {
  "devtool": false,
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src/main.ts"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ],
    "scripts": [
      "script-loader!./node_modules/jquery/dist/jquery.min.js",
      "script-loader!./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "script-loader!./node_modules/metismenu/dist/metisMenu.min.js",
      "script-loader!./src/assets/js/template.js",
      "script-loader!./src/assets/js/ckeditor.js",
      "script-loader!./node_modules/lodash/lodash.js"
    ],
    "styles": [
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "./node_modules/font-awesome/css/font-awesome.css",
      "./node_modules/primeng/resources/themes/omega/theme.css",
      "./node_modules/primeng/resources/primeng.min.css",
      "./src/assets/styling/styles.scss"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].[chunkhash:20].bundle.js",
    "chunkFilename": "[id].[chunkhash:20].chunk.js"
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader",
        "exclude": [
          /\/node_modules\//
        ]
      },
      {
        "test": /\.(json)$/,
        "use": [
          JoinPlugin.loader({group: '[folder]', name: 'assets/i18n/[folder].[ext]'})
        ]
      },
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(jpg|png|gif|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        "test": /\.(eot|otf|ttf|woff|woff2|svg)$/,
        "loader": "url-loader?name=assets/[folder]/[name].[hash:20].[ext]&limit=10000"
      },
      {
        "exclude": [
          path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
          path.join(process.cwd(), "node_modules/font-awesome/css/font-awesome.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/themes/omega/theme.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/primeng.min.css"),
          path.join(process.cwd(), "src/assets/styling/styles.scss")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
          path.join(process.cwd(), "node_modules/font-awesome/css/font-awesome.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/themes/omega/theme.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/primeng.min.css"),
          path.join(process.cwd(), "src/assets/styling/styles.scss")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
          path.join(process.cwd(), "node_modules/font-awesome/css/font-awesome.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/themes/omega/theme.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/primeng.min.css"),
          path.join(process.cwd(), "src/assets/styling/styles.scss")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
          path.join(process.cwd(), "node_modules/font-awesome/css/font-awesome.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/themes/omega/theme.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/primeng.min.css"),
          path.join(process.cwd(), "src/assets/styling/styles.scss")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
          path.join(process.cwd(), "node_modules/font-awesome/css/font-awesome.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/themes/omega/theme.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/primeng.min.css"),
          path.join(process.cwd(), "src/assets/styling/styles.scss")
        ],
        "test": /\.css$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            }
          ],
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
          path.join(process.cwd(), "node_modules/font-awesome/css/font-awesome.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/themes/omega/theme.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/primeng.min.css"),
          path.join(process.cwd(), "src/assets/styling/styles.scss")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "sass-loader",
              "options": {
                "sourceMap": false,
                "precision": 8,
                "includePaths": []
              }
            }
          ],
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
          path.join(process.cwd(), "node_modules/font-awesome/css/font-awesome.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/themes/omega/theme.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/primeng.min.css"),
          path.join(process.cwd(), "src/assets/styling/styles.scss")
        ],
        "test": /\.less$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "less-loader",
              "options": {
                "sourceMap": false
              }
            }
          ],
          "publicPath": ""
        })
      },
      {
        "include": [
          path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
          path.join(process.cwd(), "node_modules/font-awesome/css/font-awesome.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/themes/omega/theme.css"),
          path.join(process.cwd(), "node_modules/primeng/resources/primeng.min.css"),
          path.join(process.cwd(), "src/assets/styling/styles.scss")
        ],
        "test": /\.styl$/,
        "loaders": ExtractTextPlugin.extract({
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "stylus-loader",
              "options": {
                "sourceMap": false,
                "paths": []
              }
            }
          ],
          "publicPath": ""
        })
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new GlobCopyWebpackPlugin({
      "patterns": [
        "assets"
      ],
      "globOptions": {
        "cwd": path.join(process.cwd(), "src"),
        "dot": true,
        "ignore": "**/.gitkeep"
      }
    }),
    new JoinPlugin({
      "search": './src/i18n/**/*.json',
      "join": function(common, addition) {
        return merge.recursive(
          common ? common : {},
          JSON.parse(addition)
        );
      },
      "save": function(common) {
        return JSON.stringify(common);
      }
    }),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": "inline",
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": "vendor",
      "minChunks": (module) => module.resource && module.resource.startsWith(nodeModules),
      "chunks": [
        "main"
      ]
    }),
    new ExtractTextPlugin({
      "filename": "[name].[chunkhash:20].bundle.css"
    }),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new AotPlugin({
      "mainPath": "main.ts",
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment" + env() + ".ts"
      },
      "exclude": [],
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};

if (process.env.NODE_ENV === 'stg' || process.env.NODE_ENV === 'prod') {
  module.exports.plugins.push(
    new HashedModuleIdsPlugin({
      "hashFunction": "md5",
      "hashDigest": "base64",
      "hashDigestLength": 4
    }),
    new UglifyJsPlugin({
      "mangle": {
        "screw_ie8": true
      },
      "compress": {
        "screw_ie8": true,
        "warnings": false
      },
      "sourceMap": false
    })
  );
}
