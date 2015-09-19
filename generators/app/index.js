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
      }]
    }, {
      type: "list",
      name: 'css_pre',
      message: 'Select CSS preproccessor',
      choices: [{
        name: "None",
        value: "css_pre_none"
      }, {
        name: "SCSS",
        value: "css_pre_SCSS",
        checked: true
      },{
        name: "LESS",
        value: "css_pre_LESS"
      }]
    },
    {
       when: function (props) {
        return props.css_pre.indexOf('css_pre_SCSS') !== -1;
        },
        type: 'checkbox',
        name: 'SCSSpkg',
        message: 'Use my SCSS project structure.',
        choices: [{
        name: "includeSCSSpkg",
        value: "includeSCSSpkg"
      }]
    },
     {
      type: "list",
      name: 'js_pre',
      message: 'Select Js preproccessor',
      choices: [{
        name: "None",
        value: "js_pre_none"
      }, {
        name: "CoffeScript",
        value: "js_pre_coffe"
      }]
    }];
    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }
      this.includeDoc = hasFeature('includeDoc');
      this.includePkg = hasFeature('includePkg');
     
      
      var css_pre = answers.css_pre;
      function cssFeature(feat) {
        return css_pre.indexOf(feat) !== -1;
      }

      this.css_pre_none = cssFeature('css_pre_none');
      this.css_pre_SCSS = cssFeature('css_pre_SCSS');
      this.css_pre_LESS = cssFeature('css_pre_LESS');

      var SCSSpkg = answers.SCSSpkg;
      function hasSCSSpkg(feat) { return SCSSpkg.indexOf(feat) !== -1; }

      if (this.css_pre_SCSS) {
        this.includeSCSSpkg = hasSCSSpkg('includeSCSSpkg');
      }else {
        this.includeSCSSpkg = false;
      }

      
    
      var js_pre = answers.js_pre;
      
      function jsFeature(feat) {
        return js_pre.indexOf(feat) !== -1;
      }
      this.js_pre_coffe = jsFeature('js_pre_coffe');
      this.js_pre_none = jsFeature('js_pre_none');
      done();
    }.bind(this));
  },
  writing: {
    app: function () {
      this.fs.copy(this.templatePath('_bower.json'), 
      this.destinationPath('bower.json'));
    },
    stackfiles: function () {
      this.fs.copy(this.templatePath('editorconfig'), 
      this.destinationPath('.editorconfig'));
      this.fs.copy(this.templatePath('jshintrc'), 
      this.destinationPath('.jshintrc'));
      this.fs.copy(this.templatePath('bowerrc'), 
      this.destinationPath('.bowerrc'));
      this.fs.copy(this.templatePath('gitattributes'), 
      this.destinationPath('.gitattributes'));
      this.fs.copy(this.templatePath('gitignore'), 
      this.destinationPath('.gitignore'));
      this.fs.copyTpl(this.templatePath('gulpfile.js'), 
      this.destinationPath('gulpfile.js'),{
        js_pre_coffe: this.js_pre_coffe,
        js_pre_none: this.js_pre_none
      });
      this.fs.copy(this.templatePath('assets.js'), 
      this.destinationPath('tasks/assets.js'));
      this.fs.copy(this.templatePath('images.js'), 
      this.destinationPath('tasks/images.js'));
      if (this.includePkg) {
        this.fs.copyTpl(this.templatePath('package.js'), 
      this.destinationPath('tasks/package.js'),{
        js_pre_coffe: this.js_pre_coffe,
        js_pre_none: this.js_pre_none
      });
      }
      this.fs.copyTpl(this.templatePath('scripts.js'), 
      this.destinationPath('tasks/scripts.js'), {
        js_pre_coffe: this.js_pre_coffe,
        js_pre_none: this.js_pre_none
      });
      this.fs.copyTpl(this.templatePath('styles.js'), 
      this.destinationPath('tasks/styles.js'),{
        css_pre_none : this.css_pre_none, 
        css_pre_SCSS : this.css_pre_SCSS,
        css_pre_LESS : this.css_pre_LESS
      });
      this.fs.copy(this.templatePath('utility.js'), 
      this.destinationPath('tasks/utility.js'));
      this.fs.copy(this.templatePath('readme.md'), 
      this.destinationPath('readme.md'));
    },
    projectfiles: function () {
      this.fs.copy(this.templatePath('index.html'), 
      this.destinationPath('app/index.html'));
      if (this.includePkg) {
        this.fs.copy(this.templatePath('tech-placeholder.jpeg'), 
      this.destinationPath('app/image-placeholders/tech-placeholder.jpeg'));
      }
      this.fs.copy(this.templatePath('tech.jpeg'), 
      this.destinationPath('app/images/tech.jpeg'));
      if (this.js_pre_none) {
        this.fs.copy(this.templatePath('main.js'), 
      this.destinationPath('app/scripts/main.js'));
      }
      if (this.js_pre_coffe) {
        this.fs.copy(this.templatePath('main.js'), 
      this.destinationPath('app/scripts/main.coffee'));
      }
      this.fs.copy(this.templatePath('favicon.ico'), 
      this.destinationPath('app/favicon.ico'));
      this.fs.copy(this.templatePath('footer.tpl'), 
      this.destinationPath('app/footer.tpl'));
      this.fs.copy(this.templatePath('robots.txt'), 
      this.destinationPath('app/robots.txt'));

      if (this.css_pre_SCSS) {
       this.fs.copyTpl(this.templatePath('vendor.scss'), 
       this.destinationPath('app/vendor.scss'), {
         includeSCSSpkg: this.includeSCSSpkg
       });
       this.fs.copyTpl(this.templatePath('style.scss'), 
       this.destinationPath('app/style.scss'), {
         includeSCSSpkg: this.includeSCSSpkg
       });
      }

      if (this.css_pre_LESS) {
        this.fs.copy(this.templatePath('style.less'), 
        this.destinationPath('app/style.less'));
        this.fs.copy(this.templatePath('vendor.less'), 
        this.destinationPath('app/vendor.less'));
      }


    },
    SCSSpackage: function () {
      if (this.includeSCSSpkg) {
        this.fs.copy(this.templatePath('_base.scss'), 
      this.destinationPath('app/scss/base/_base.scss'));
        this.fs.copy(this.templatePath('_variables.scss'), 
      this.destinationPath('app/scss/base/_variables.scss'));
        this.fs.copy(this.templatePath('_components.scss'), 
      this.destinationPath('app/scss/components/_components.scss'));
        this.fs.copy(this.templatePath('_mixins.scss'), 
      this.destinationPath('app/scss/mixin/_mixins.scss'));
        this.fs.copy(this.templatePath('_pages.scss'), 
      this.destinationPath('app/scss/pages/_pages.scss'));
      }     
    },
    documentation: function () {
      if (this.includeDoc) {
        this.fs.copy(this.templatePath('documentation.html'), 
      this.destinationPath('documentation/documentation.html'));
      }
    },
    packageTask: function () {
      this.fs.copyTpl(this.templatePath('_package.json'), 
      this.destinationPath('package.json'), {
        includePkg: this.includePkg,
        js_pre_coffe: this.js_pre_coffe
      });
      this.fs.copyTpl(this.templatePath('config.json'), 
      this.destinationPath('tasks/config.json'), {
        includePkg: this.includePkg,
        js_pre_coffe: this.js_pre_coffe,
        js_pre_none: this.js_pre_none
      });
      this.fs.copyTpl(this.templatePath('serve.js'), 
      this.destinationPath('tasks/serve.js'), {
        includePkg: this.includePkg,
        js_pre_coffe: this.js_pre_coffe,
        js_pre_none: this.js_pre_none,
        css_pre_SCSS : this.css_pre_SCSS,
        css_pre_LESS : this.css_pre_LESS        
      });
    }
  },
  install: function () {
    //this.installDependencies();
  }
});