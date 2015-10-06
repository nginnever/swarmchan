contract permawall{
	
	string dataHash = "test";

	function setHash(string givenHash) {
		dataHash = givenHash;
	}

	function getHash() constant returns (string data) {
		return dataHash;
	}
}