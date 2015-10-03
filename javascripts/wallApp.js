var app = angular.module('wallApp', ['ngRoute']);
var ipfs_api = require('ipfs-api');
var ipfs = ipfs_api('localhost', '5001');
var http = require("http");
var web3 = require('web3');

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/wall', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the about display
    .when('/', {
      templateUrl: 'about.html',
      controller: 'dataController'  
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
    
});
var permaObj = [];
var hash = '';

app.controller('dataController', function($scope){
  //var id = 'QmNjRVohhWBX31EoaAXkrj5mPF9vQNcTVvQgWHNwdxweCN';
  var id = 'Qmd4kFg6HMp7c1Uqnm2UZqx7iGoECKA8r3sXHN2UcTY2pB';

  //ethereum connections
  web3.setProvider(new web3.providers.HttpProvider());

  var coinbase = web3.eth.accounts[0];
  var balance = web3.fromWei(web3.eth.getBalance(coinbase), "ether");

  console.log(balance);

  function resolveID(callback){
    ipfs.name.resolve(id, function(err,res){
      if(err|| !res){
        return console.error(err)
      }
      var jsonString = String(res.Path);
      jsonString = jsonString.replace('/ipfs/','');
      hash = jsonString;
      console.log(jsonString);
      callback();
    });
  };

  resolveID(function(){
    ipfs.cat(hash, function (err, res) {
        if (err || !res) {
            return console.error(err)
        }

        if (res.readable) {
            // Returned as a stream
            //comment out as to not use response object on the console
            //res.pipe(process.stdout); 
            var string = '';

            //turn the buffer response from ipfs into string then json
            res.setEncoding('utf8');
            res.on('readable', function () {
                var part = res.read().toString();
                string += part;
                var obj = JSON.parse(string);
                permaObj = obj;        
            })
        } else {
            var obj = res;
            permaObj = obj;
            console.log(obj);
        }
      });
    });
});

app.controller('mainController', function($scope){
    var returnHash = '';
    $scope.posts2 = permaObj;
    $scope.hash = hash;
    $scope.newPost = {created_by: '', text: '', created_at: ''};

    $scope.post = function(){
      var newObjStr = JSON.stringify(permaObj);
      newObjStr = newObjStr.replace(']','');
      newObjStr += ',{\"created_by\":\"'+$scope.newPost.created_by+'\",\"text\":\"'+$scope.newPost.text+'\",\"created_at\":\"'+Date.now()+'\"}]';
      var newObj = JSON.parse(newObjStr);

      function wait(callback){
        console.log("adding this object " + newObjStr);
        ipfs.add(new Buffer(newObjStr), function (err, res) {
                 if (err || !res) return console.error(err)
                  returnHash = res.Hash;
                  console.log(returnHash);
                  callback();
             });  
      }
      wait(function(){
          ipfsPublish(returnHash, function(o){
            console.log("Hash: "+o.Value + " Published to ID: "+o.Name);
          })
      		function ipfsPublish(returnHash, callback){
            var options = {
                host: 'localhost',
                port: 5001,
                path: '/api/v0/name/publish?arg='+returnHash+'&stream-channels=true',
                method: 'POST'
              };
 
            var req = http.request(options, function(res) {
              res.setEncoding('utf8');
              res.on('data', function (chunk) {
                json = JSON.parse(chunk);
                callback(json);
              });
            });
            req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            });

          req.end();
        }
      });
      
      $scope.newPost.created_at = Date.now();
      $scope.posts2.push($scope.newPost);
      $scope.newPost = {created_by: '', text: '', created_at: ''};
    };
});

app.controller('authController', function($scope){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $scope.error_message = 'login request for ' + $scope.user.username;
  };

  $scope.register = function(){
    $scope.error_message = 'registeration request for ' + $scope.user.username;
  };
});