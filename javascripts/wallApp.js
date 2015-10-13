var app = angular.module('wallApp', ['ngRoute']);
var ipfs_api = require('ipfs-api');
var ipfs = ipfs_api('localhost', '5001');
var http = require("http");
var web3 = require('web3');

var permaObj = [];
var hash = '';


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
    //the image boards display
    .when('/boards', {
      templateUrl: 'boards.html',
      controller: 'dataController'
    })

    //controllers for each board
    .when('/b', {
      templateUrl: 'b.html',
      controller: 'bController'
    })

    .when('/coming', {
      templateUrl: 'coming.html' //lulz
    })

    // //the signup display *** we won't be doing any of this ;)
    // .when('/register', {
    //   templateUrl: 'register.html',
    //   controller: 'authController'
    // });
    
});

//ethereum connections
window.getAddress = function(){
  web3.setProvider(new web3.providers.HttpProvider());

  var coinbase = web3.eth.accounts[1];
  var balance = web3.fromWei(web3.eth.getBalance(coinbase), "ether");
  return coinbase;
}

window.getBalance = function(){
  web3.setProvider(new web3.providers.HttpProvider());

  var coinbase = web3.eth.accounts[1];
  var balance = web3.fromWei(web3.eth.getBalance(coinbase), "ether");
  return balance;
}

//use this function for autoupdating the wall 
// window.watchBlocks = function(){
//   var filter = web3.eth.filter('pending');
//   filter.watch(function(err, log){
//       web3.eth.getBlock('latest', function(error, result){
//         if(!error){
//           console.log(result)
//         }
//         else
//           console.error(error);
//       });

//       if(!err){
//         //console.log(log);
//       }
//     });
// }


app.controller('bController', function($scope){
  //do some smart contract call here to get data hash for b board
});

app.controller('dataController', function($scope){
  //var id = 'QmNjRVohhWBX31EoaAXkrj5mPF9vQNcTVvQgWHNwdxweCN';
  //var id = 'Qmd4kFg6HMp7c1Uqnm2UZqx7iGoECKA8r3sXHN2UcTY2pB';
  //var id = 'QmdprAq8ZvnfpRfFsDUjLbNoZXEzrE8rc4quSaje3m5dgN';

  console.log(web3.currentProvider)
  if(!web3.currentProvider){
    console.log("no provider... creating")
    web3.setProvider(new web3.providers.HttpProvider());
  }

  
  //console.log(web3.eth.getCode('0x73a389029e7720e9203b636666b28c51b77a71cc'));

  //permachanInstance.setHash(firstHalf2, secondHalf2 {from: web3.eth.accounts[1], gas: 70000});

  function resolveID(callback){
    //pulling the latest data hash from ethereum
    var contractCode = '60606040526104b9806100126000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806311c171ba1461004f57806333c0f099146100ca578063e15fe023146101455761004d565b005b61005c6004805050610341565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156100bc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d760048050506103fd565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156101375780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101e06004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919050506101e2565b005b8160006000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023157805160ff1916838001178555610262565b82800160010185558215610262579182015b82811115610261578251826000505591602001919060010190610243565b5b50905061028d919061026f565b80821115610289576000818150600090555060010161026f565b5090565b50508060016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102de57805160ff191683800117855561030f565b8280016001018555821561030f579182015b8281111561030e5782518260005055916020019190600101906102f0565b5b50905061033a919061031c565b80821115610336576000818150600090555060010161031c565b5090565b50505b5050565b602060405190810160405280600081526020015060006000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103ee5780601f106103c3576101008083540402835291602001916103ee565b820191906000526020600020905b8154815290600101906020018083116103d157829003601f168201915b505050505090506103fa565b90565b602060405190810160405280600081526020015060016000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104aa5780601f1061047f576101008083540402835291602001916104aa565b820191906000526020600020905b81548152906001019060200180831161048d57829003601f168201915b505050505090506104b6565b9056';
    var permachanContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getHash1","outputs":[{"name":"part1","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"getHash2","outputs":[{"name":"part2","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"firstPart","type":"string"},{"name":"secondPart","type":"string"}],"name":"setHash","outputs":[],"type":"function"}]);
    var permachanInstance = permachanContract.at('0x73a389029e7720e9203b636666b28c51b77a71cc');
    hash = permachanInstance.getHash1()+permachanInstance.getHash2();
    console.log('from ethereum contract: '+permachanInstance.getHash1()+permachanInstance.getHash2());
    callback();
  }

  //ipns resolving - replaced with ethereum
  // function resolveID(callback){
  //   ipfs.name.resolve(id, function(err,res){
  //     if(err|| !res){
  //       return console.error(err)
  //     }
  //     var jsonString = String(res.Path);
  //     jsonString = jsonString.replace('/ipfs/','');
  //     hash = jsonString;
  //     console.log(jsonString);
  //     callback();
  //   });
  // };

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


//*
app.controller('pageCtrl', function($scope){
  $scope.currentPage = 0;
  $scope.limit = 10;
})

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

app.controller('mainController', function($scope){
    var returnHash = '';
    $scope.posts2 = permaObj;
    $scope.hash = hash;
    $scope.newPost = {created_by: '', text: '', created_at: ''};
    $scope.pic;

    //pagenation stuff
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.mySort = $scope.newestFirst = function(post) {
        return -$scope.posts2.indexOf(post);
    }

    $scope.numberOfPages=function(){
        return Math.ceil(Object.keys(permaObj).length/$scope.pageSize);                
    }


    //post handler 
    $scope.post = function(){
      var newObjStr = JSON.stringify(permaObj);
      if($scope.newPost.created_by == ""){
        $scope.newPost.created_by = "Anonymous"
      }

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
        //set the variables in contract
        var splitHash = returnHash;
        var firstHalf = splitHash.substr(0, 24);
        var secondHalf = splitHash.substr(24);
        console.log(firstHalf);
        console.log(secondHalf);

        var contractCode = '60606040526104b9806100126000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806311c171ba1461004f57806333c0f099146100ca578063e15fe023146101455761004d565b005b61005c6004805050610341565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156100bc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d760048050506103fd565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156101375780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101e06004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919050506101e2565b005b8160006000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023157805160ff1916838001178555610262565b82800160010185558215610262579182015b82811115610261578251826000505591602001919060010190610243565b5b50905061028d919061026f565b80821115610289576000818150600090555060010161026f565b5090565b50508060016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102de57805160ff191683800117855561030f565b8280016001018555821561030f579182015b8281111561030e5782518260005055916020019190600101906102f0565b5b50905061033a919061031c565b80821115610336576000818150600090555060010161031c565b5090565b50505b5050565b602060405190810160405280600081526020015060006000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103ee5780601f106103c3576101008083540402835291602001916103ee565b820191906000526020600020905b8154815290600101906020018083116103d157829003601f168201915b505050505090506103fa565b90565b602060405190810160405280600081526020015060016000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104aa5780601f1061047f576101008083540402835291602001916104aa565b820191906000526020600020905b81548152906001019060200180831161048d57829003601f168201915b505050505090506104b6565b9056';
        var permachanContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getHash1","outputs":[{"name":"part1","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"getHash2","outputs":[{"name":"part2","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"firstPart","type":"string"},{"name":"secondPart","type":"string"}],"name":"setHash","outputs":[],"type":"function"}]);
        var permachanInstance = permachanContract.at('0x73a389029e7720e9203b636666b28c51b77a71cc');

        permachanInstance.setHash(firstHalf, secondHalf, {from: web3.eth.accounts[1], gas: 70000});


        //   ipfsPublish(returnHash, function(o){
        //     console.log("Hash: "+o.Value + " Published to ID: "+o.Name);
        //   })
          // function ipfsPublish(returnHash, callback){
        //     var options = {
        //         host: 'localhost',
        //         port: 5001,
        //         path: '/api/v0/name/publish?arg='+returnHash+'&stream-channels=true',
        //         method: 'POST'
        //       };

        //     var req = http.request(options, function(res) {
        //       res.setEncoding('utf8');
        //       res.on('data', function (chunk) {
        //         json = JSON.parse(chunk);
        //         callback(json);
        //       });
        //     });
        //     req.on('error', function(e) {
        //     console.log('problem with request: ' + e.message);
        //     });

        //   req.end();
        // }
      });
      
      $scope.newPost.created_at = Date.now();
      objStr = JSON.stringify(permaObj);
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