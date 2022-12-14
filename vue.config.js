const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/tome-planner/" : "/",
  chainWebpack: config => {
    config.module.rule('images').set('parser', {
      dataUrlCondition: {
        maxSize: 1 * 1024
      }
    })
  }
})
