// Exportando a configuração do Babel
module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        ['@babel/preset-react', {
            runtime: 'automatic' // Faz a importação do React de forma automática para todo arquivo que for .jsx
        }]
    ]
}