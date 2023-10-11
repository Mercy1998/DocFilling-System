'use strict'

const path = require('path')

module.exports = {
    configureWebpack: (config) => {
        // 解决xlsx-style报错的问题
        return {
            externals: [{
                './cptable': 'var cptable'
            }]
        }
    }
}
