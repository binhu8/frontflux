const proxy = [
    {
        context: '/api',
        target: 'https://psimanager.herokuapp.com',
        pathRewrite: {'^/api' : ''}
    }
]

module.exports = proxy