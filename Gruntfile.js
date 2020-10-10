const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-aws')
  grunt.loadNpmTasks('grunt-webpack')

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('.aws.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: '<%= aws.bucket %>',
      },
      build: {
        cwd: 'client/dist',
        src: '**',
      },
    },
    webpack: {
      myConfig: webpackConfig,
    }
  })

  grunt.registerTask('default', ['webpack'])
}
