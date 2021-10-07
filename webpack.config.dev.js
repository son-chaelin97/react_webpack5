const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
  },
  //소스 맵이 생성되는지 여부와 생성 방법을 제어함
  devtool: 'inline-source-map', // 소스맵: 원본 소스와 난독화된 소스를 매핑해주는 방법 중 하나
  resolve: { extensions: ['.js', '.json', '.ts', '.tsx'] },
  //webpack-dev-server의 동작을 변경할 수 있는 옵션
  devServer: {
    https: true, //https를 사용할지 http를 사용할지 설정
    host: 'localhost.apptest.ai', //host이름 설정
    compress: true, //제공되는 모든 항목에 대해 gzip 압축 활성화
    hot: true, //웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게 하는 설정 활성화
    port: 3000, //port 번호 설정
    open: true, //서버가 시작된 후 브라우저(예. 크롬)을 열도록 함
    client: {
      progress: true, //브라우저에서 컴파일 진행률을 백분율로 보여줌
    },
  },
  //표시되는 번들 정보를 정확하게 제어할 수 있는 옵션
  stats: {
    cachedModules: false, //빌드되지 않고 캐시된 모듈에 대한 정보를 추가하지 않음
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name]-[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: false,
            name: 'images/[name]-[hash].[ext]',
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [new HtmlWebPackPlugin({ template: './public/index.html' })],
};
