contract permawall{
	
	string dataHash1;
	string dataHash2;

	function setHash(string firstPart, string secondPart) {
        dataHash1 = firstPart;
        dataHash2 = secondPart;
	}

	function getHash1() constant returns (string part1 ) {
		return dataHash1;
	}
	
	function getHash2() constant returns (string part2 ) {
		return dataHash2;
	}
}