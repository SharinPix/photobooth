'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: true,
    },
    svgJar: {
      strategy: 'inline',
      inline: {
        copypastaGen: (assetId) => `{{svg-jar "${assetId}" class="icon"}}`,
        throwOnFailure: true,
        stripPath: false,
        sourceDirs: ['app/svg'],
      },
    },
  });

  return app.toTree();
};
