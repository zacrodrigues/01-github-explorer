// O path é utilizado para que o acesso a diretórios seja compreendido por qualquer sistema operacional, conforme o formato padrão que cada um utiliza, sendo "/" ou "\"
const path = require('path')

// Instalando o plugin => yarn add html-webpack-plugin -D
// Importando um plugin do Webpack que injeta, automaticamente, o Javascript no HTML.
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Instalando o plugin => yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
// Importando plugin React Refresh Webpack
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

// Variável que verifica se a aplicação está em ambiente de desenvolvimento ou em ambiente de produção.
const isDevelopment = process.env.NODE_ENV !== 'production';
// Para criar uma variável de ambiente, deverá rodar o comando -> NODE_ENV=production yarn webpack
// Mas este comando funciona somente para Linux e Mac, para o Windows funciona de uma forma diferente.
// Para funcionar também no Windows, será necessário instalar a funcionalidade cross-env, com o comando -> yarn add cross-env -D
// O cross-env serve para definirmos variáveis ambiente independente de qual seja o sistema operacional.

// Exportando configurações do webpack
module.exports = {
  // Define qual modo de execução para o webpack
  // Se a aplicação estiver em ambiente de desenvolvimento, o modo do Webpack deve ser development, senão deve ser production.
  mode: isDevelopment ? 'development' : 'production',

  // SourceMaps ajuda a visualizar o código original da aplicação quando ocorrer algum erro e o mesmo for reportado no console.log
  // Configurando a funcionalidade do SourceMaps
  // Se a aplicação estiver em ambiente de desenvolvimento, o SourceMap deve ser eval-source-map, se estiver em produção, deve ser source-map
  // O source-map é um processo um pouco mais lento de gerar um SourceMap, mas ele retorna mais detalhes da aplicação.
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',

  // O 'entry' expecifica  qual é o arquivo inicial/principal da aplicação.
  // __dirname pega o diretório onde se encontra o arquivo webpack.config.js
  // Ele acessa a pasta "src" e no lugar da vírgula, utiliza a "barra" conforme o formato padrão do sistema operacional, sendo "/" ou "\"
  entry: path.resolve(__dirname, 'src', 'index.tsx'),

  // O 'output' especifica qual o arquivo de saída da aplicação.
  output: {
    // O 'path' recebe o caminho até o diretório onde está armazenado o arquivo de saída da aplicação.
    path: path.resolve(__dirname, 'dist'),
    // O 'filename' especifica o arquivo de saída da aplicação dentro do diretório passado para o 'path'.
    filename: 'bundle.js'
  },

  // Instalando a funcionalidade devServer => yarn add wepack-dev-server -D
  // Configurando funcionalidade que toda vez que uma alteração for feita nos arquivos dentro da pasta src, será gerado novamente o Bundle, atualizando automaticamente todo o conteúdo que está sendo exibido no navegador.
  devServer: {
    static : {
      directory: path.resolve('src', 'public'),
    },
    hot : true,
  },


  plugins: [
    // Configurando o plugin React Refresh Webpack somente em ambiente de desenvolvimento.
    isDevelopment && new ReactRefreshWebpackPlugin(),

    // Configurando o plugin do Webpack para a injeção do Javascript no HTML de forma automática.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean), // Filtra tudo que for Boolean e remove para que não haja erro na aplicação.

  // Por padrão, o webpack lê arquivos .js
  // O 'resolve' especifica quais arquivos o Webpack poderá ler.
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  // Configuração que dirá como a aplicação se comportará com a importação de cada tipo de arquivo.
  module: {
    // 'array' de regras que possui um objeto para configurar cada tipo de arquivo.
    rules: [
      {
        test: /\.(j|t)sx$/, // Recebe uma expressão regular para dizer se o arquivo é javascript ou não.
        exclude: /node_modules/, // Exclui os arquivos dentro da node_modules pois eles já estão formatados conforme o navegador conseguirá entender.
        use: {
          loader: 'babel-loader', // Faz a integração entre o Babel e o Webpack.
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        },
      },

      // Para a aplicação conseguir ler arquivos CSS, será necessário instalar duas dependências, style-loader e css-loader
      // Para instalar essas duas dependências, executamos o seguinte comando no terminal -> yarn add style-loader css-loader -D
      // Para instalar um pré-processador de CSS, utilizamos o SASS, com o seguinte comando -> yarn add sass
      // Para configurar o SASS, utilizamos o seguinte comando para instalar a dependência sass-loader -> yarn add sass-loader
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  }
}