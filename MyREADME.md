# TrackMED-RTS: React-Bootstrap

React-Bootstrap is a complete re-implementation of the Bootstrap components using React. **_It has no dependency on either bootstrap.js or jQuery_**. If you have React setup and React-Bootstrap installed you have everything you need.

[Visit Getting Started](https://react-bootstrap.github.io/getting-started/introduction/)

## Stylesheets

Because React-Bootstrap doesn't depend on a very precise version of Bootstrap, we don't ship with any included css. However, some stylesheet is required to use these components. How and which bootstrap styles you include is up to you, but the simplest way is to include the latest styles from the CDN.

React-Bootstrap currently targets Bootstrap v3. To use React-Bootstrap, include the CSS for Bootstrap v3 instead of Bootstrap v4.


<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
          
For more advanced use cases you can also use a bundler like Webpack or Browserify to include the css files for you as part of your build process but that is beyond the scope of this guide. Also see http://getbootstrap.com/customize/ for details about customizing stylesheets to match your component use.

## Themes
React-Bootstrap is compatible with existing Bootstrap themes. Just follow the installation instructions for your theme of choice.

Because React-Bootstrap completely reimplements Bootstrap's JavaScript, it's not automatically compatible with themes that extend the default JavaScript behaviors.

## Javascript
React-Bootstrap is a complete re-implementation of the Bootstrap components using React. It has no dependency on either bootstrap.js or jQuery. If you have React setup and React-Bootstrap installed you have everything you need.

You can consume the library as CommonJS modules, ES6 modules via Babel, AMD, or as a global JS script.

## Bundle size optimization
If you install React-Bootstrap using npm, you can import individual components from react-bootstrap/lib rather than the entire library. Doing so pulls in only the specific components that you use, which can significantly reduce the size of your client bundle.

### CommonJS
var Alert = require('react-bootstrap/lib/Alert'); // or var Alert = require('react-bootstrap').Alert;
/>

### ES6
Es6 modules aren't supported natively yet, but you can use the syntax now with the help of a transpiler like Babel.

import Button from 'react-bootstrap/lib/Button';
// or
import { Button } from 'react-bootstrap';

### AMD
AMD support is limited to requiring the entire package. If you only want to consume specific components, consider using npm and CommonJS modules instead.


define(['react-bootstrap'], function(ReactBootstrap) {
var Alert = ReactBootstrap.Alert;
...
});
## Browser globals
We provide react-bootstrap.js and react-bootstrap.min.js bundles with all components exported on the window.ReactBootstrap object. These bundles are available on CDNJS, and in both the Bower and NPM packages.


<script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react-dom.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/<version>/react-bootstrap.min.js"></script>
<script>
var Alert = ReactBootstrap.Alert;
</script>
## Browser support
We aim to support all browsers supported by both React and Bootstrap.

Unfortunately, due to the lack of resources and the will of dedicating the efforts to modern browsers and getting closer to Bootstrap's features, we will not be testing react-bootstrap against IE8 anymore.
We will however continue supporting IE8 as long as people submit PRs addressing compatibility issues with it.

React requires polyfills for non-ES5 capable browsers.


<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
<![endif]-->