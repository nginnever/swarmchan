contract permawall{
	
	string dataHash1;
	string dataHash2;
	//string prevHash = get previous hash from blockchain;

	function setHash(string firstPart, string secondPart, string check) {
		if(check == prevHash) {
	        dataHash1 = firstPart;
	        dataHash2 = secondPart;
	        prevHash = firstPart;
	    }    
	}

	function getHash1() constant returns (string part1 ) {
		return dataHash1;
	}
	
	function getHash2() constant returns (string part2 ) {
		return dataHash2;
	}
}