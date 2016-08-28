'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var model = require('./models/page');
var config = require('./config');
var vash = require('vash');
var bodyParser = require('body-parser');

app.set('view engine', 'vash');
app.set('views', './views');

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//compile templates
fs.readdir('./views/partials', (err, list) => {
  list.forEach((file) => {
    var name = file.substring(0, file.indexOf('.'));
    fs.readFile('./views/partials/' + file, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      vash.helpers.tplcache[name] = vash.compile(data);
    });
  });
});

//set up routes
fs.readdir('./routes', (err, list) => {
  list.forEach((file) => {
    let name = file === 'home.js' ? '/' : '/' + file.substring(0, file.indexOf('.'));
    app.use(name, require('./routes/' + file)(express.Router()));
  });

  //404 route
  app.get('*', (req, res) => {
    req.app.locals.throwNotFoundError(req, res);
  });
});

app.locals.renderView = (view, req, res) => {
  fs.stat('./views/' + view + '.vash', (err, stats) => {
    if (err) {
      req.app.locals.throwNotFoundError(req, res);
    } else if (!model[view]) {
      try {
        require('./models/' + view)(model);
      } catch (ex) {
        //no model
      }

      model.meta.currentPage = req.protocol + '://' + req.headers.host + req.originalUrl;
      model.name = view;

      res.render(view, Object.assign({}, model));
    }
  });
}

app.locals.throwNotFoundError = (req, res) => {
  res.statusCode = 404;
  res.statusMessage = 'Not found';
  app.locals.renderView('errors/404', req, res);
}

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening On Port %s', config.port);
    console.log('Environment: %s', process.env.NODE_ENV);
  }
});