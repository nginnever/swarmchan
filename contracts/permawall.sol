contract permawall{
	
	string dataHash;

	function setHash(string givenHash) {
		dataHash = givenHash;
	}

	function getHash() constant returns (string data) {
		return dataHash;
	}
}