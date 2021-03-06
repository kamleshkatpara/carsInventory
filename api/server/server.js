'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var bodyParser = require('body-parser')

var app = module.exports = loopback();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

var ds = loopback.createDataSource({
  connector: require('loopback-storage-service'),
  provider: 'filesystem',
  root: path.join(__dirname, 'storage')
  });
  var Container = ds.createModel('container');

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
   // app.start();
   app.io = require('socket.io')(app.start());

   app.io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('modelSaved', function(modelSaved){
      app.io.emit('modelSaved', modelSaved);
    });

    socket.on('modelUpdated', function(modelUpdated){
      aap.io.emit('modelUpdated', modelUpdated);
    });

  });
});
