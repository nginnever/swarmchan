var app = angular.module('wallApp', ['ngRoute']);

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
	var id = 'QmNjRVohhWBX31EoaAXkrj5mPF9vQNcTVvQgWHNwdxweCN';

	function wait(callback){
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
	//these http request functions i made will throw CORS error
		/*function wait(callback){
			ipfsResolve(id, function(j){
			   console.log(j);
			   hash = j;
			   callback();
			});
		}
		wait(function(){*/
			/*ipfsCat(hash, function(o){
				permaObj = o;
			 	console.log(o);
			});*/
		//});
	wait(function(){
		ipfs.cat(hash, function (err, res) {
                if (err || !res) {
                    return console.error(err)
                }

                if (res.readable) {
                    // Returned as a stream
                    //res.pipe(process.stdout); //comment out as to not use response object on the console
                    var string = '';

                    //turn the buffer response from ipfs into string then json
                    res.setEncoding('utf8');
                    res.on('readable', function () {
                        var part = res.read().toString();
                        string += part;
                        var obj = JSON.parse(string);
                        permaObj = obj;
              			console.log(obj);         
                    })
                } else {
                    // Returned as a string
                    //console.log(res) //api ran one server side returns buffer
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
				/*ipfs.add(new Buffer(newObjStr), function (err, res) {
                 if (err || !res) return console.error(err)

                 for (var i = 0; i < res.length; i++) {
                    returnHash = o;
					$scope.hash = returnHash;
					console.log(returnHash);
					callback();
                 }
             });	*/

				ipfsAdd(newObjStr, function(o){
					returnHash = o;
					$scope.hash = returnHash;
					console.log(returnHash);
					callback();
				});
			}
			//returns error, This command can't be called directâ€¦
			// wait(function(){
			// 	ipfs.name.publish(returnHash, function(err,res){
			// 		if(err|| !res){
			// 			return console.error(err)
			// 		}
			// 		console.log(res);
			// 	});
			// });
			wait(function(){
				ipfsPublish(returnHash, function(h){
					console.log(h);
				});
			});
			
			$scope.newPost.created_at = Date.now();
		
			//permaObj.push({created_by: $scope.newPost.created_by, text: $scope.newPost.text, created_at: $scope.newPost.created_at});
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