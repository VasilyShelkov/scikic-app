const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/semantic', express.static(path.join(__dirname, 'semantic')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/bootstrap', express.static(
	path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
	)
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server running at http://localhost:${port}`);
});
