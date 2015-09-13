'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the splendid ' + chalk.red('Htmlapp') + ' generator!'
    ));

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
       name: 'Documentation',
       value: 'includeDoc',
       checked: false
     }, {
      name: 'Advanced task for theme sale',
      value: 'includePkg',
      checked: false
    },
    {
      name: 'Create SCSS project structure',
      value: 'includeSCSSpkg',
      checked: false
    }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) { return features.indexOf(feat) !== -1; }

      this.includeDoc = hasFeature('includeDoc');
      this.includePkg = hasFeature('includePkg');
      this.includeSCSSpkg = hasFeature('includeSCSSpkg');

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    stackfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('assets.js'),
        this.destinationPath('tasks/assets.js')
      );
      
      this.fs.copy(
        this.templatePath('images.js'),
        this.destinationPath('tasks/images.js')
      );
      if (this.includePkg) {
       this.fs.copy(
         this.templatePath('package.js'),
         this.destinationPath('tasks/package.js')
       );
      } 
      this.fs.copy(
        this.templatePath('scripts.js'),
        this.destinationPath('tasks/scripts.js')
      );
      this.fs.copy(
        this.templatePath('serve.js'),
        this.destinationPath('tasks/serve.js')
      );
      this.fs.copy(
        this.templatePath('styles.js'),
        this.destinationPath('tasks/styles.js')
      );
      this.fs.copy(
        this.templatePath('utility.js'),
        this.destinationPath('tasks/utility.js')
      );
      this.fs.copy(
        this.templatePath('readme.md'),
        this.destinationPath('readme.md')
      );
    },
    projectfiles : function() {
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html')
      );
      if (this.includePkg) {
        this.fs.copy(
          this.templatePath('tech-placeholder.jpeg'),
          this.destinationPath('app/image-placeholders/tech-placeholder.jpeg')
        );
      }
      this.fs.copy(
        this.templatePath('tech.jpeg'),
        this.destinationPath('app/images/tech.jpeg')
      );
      this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath('app/scripts/main.js')
      );
      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('app/favicon.ico')
      );
      this.fs.copy(
        this.templatePath('footer.tpl'),
        this.destinationPath('app/footer.tpl')
      );
      this.fs.copy(
        this.templatePath('robots.txt'),
        this.destinationPath('app/robots.txt')
      );
      this.fs.copy(
        this.templatePath('style.scss'),
        this.destinationPath('app/style.scss')
      );
      this.fs.copy(
        this.templatePath('vendor.scss'),
        this.destinationPath('app/vendor.scss')
      );
    },
    SCSSpackage : function() {
      if (this.includeSCSSpkg) {
        this.fs.copy(
          this.templatePath('_base.scss'),
          this.destinationPath('app/scss/base/_base.scss')
        );
        this.fs.copy(
          this.templatePath('_variables.scss'),
          this.destinationPath('app/scss/base/_variables.scss')
        );
        this.fs.copy(
          this.templatePath('_components.scss'),
          this.destinationPath('app/scss/components/_components.scss')
        );
        this.fs.copy(
          this.templatePath('_mixins.scss'),
          this.destinationPath('app/scss/mixin/_mixins.scss')
        );
        this.fs.copy(
          this.templatePath('_pages.scss'),
          this.destinationPath('app/scss/pages/_pages.scss')
        );
      }
      this.fs.copyTpl(
        this.templatePath('vendor.scss'),
        this.destinationPath('app/vendor.scss'),
        {
          includeSCSSpkg: this.includeSCSSpkg
        }
      );
      this.fs.copyTpl(
        this.templatePath('style.scss'),
        this.destinationPath('app/style.scss'),
        {
          includeSCSSpkg: this.includeSCSSpkg
        }
      );
    },
    documentation : function() {
      if (this.includeDoc) {
        this.fs.copy(
          this.templatePath('documentation.html'),
          this.destinationPath('documentation/documentation.html')
        );
      }       
    },
    configJson : function() {
      this.fs.copyTpl(
        this.templatePath('config.json'),
        this.destinationPath('tasks/config.json'),
        {
          includePkg: this.includePkg
        }
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
