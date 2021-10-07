const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  //파일이 번들되면 어디로 보낼지 설정하는 옵션
  output: {
    path: path.join(__dirname, 'build'), //번들 파일이 저장될 디렉토리 이름
    filename: '[name].[contenthash].js', //웹팩 실행 후 생성된 새로운 번들 파일에 대해 설정한 이름(기본적으로 모든 js 코드를 하나의 파일로 묶는다.)
    chunkFilename: '[name].bundle.js', //하나의 번들 파일을 효과적으로 다루기 위해 여러가지의 파일로 다시 나눈 코드(Chunk)를 저장하는 파일의 이름을 설정
    publicPath: '/', //어플리케이션의 기본 경로 설정
  },
  //파일 번들링 규칙을 지정하는 옵션
  module: {
    //모듈이 생성되는 방식을 수정할 수 있음
    rules: [
      {
        test: /\.(ts|js)x?$/, //특정 로더의 대상이 되어야 하는 파일의 확장자(js파일이나 jsx파일을 바벨 로더에 의해 번들되어야 함을 의미함.)
        exclude: /nodeModules/, //번들러가 무시해야 하는 파일 지정
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, //폰트 파일이 로더될 수 있도록 함
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
        use: ['style-loader', 'css-loader'], //배열 안에는 정확한 순서로 작성되어야 함. css 파일을 공통 js로 전환하는 css-loader를 실행한 다음 css를 문자열 파일로 추출하는 style-loader를 실행해야 함.
      },
    ],
  },
  //모듈 해석에 대한 설정
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'], //확장자를 순서대로 해석함. 여러 파일에서 이름이 동일하지만 다른 확장자를 가진 경우, 배열의 앞에서부터 파일을 해석하고 남은 것은 해석하지 않음.
  },
  //웹팩이 html 파일 템플릿을 알 수 있도록 하는 HtmlWebpackPlugin을 추가
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
