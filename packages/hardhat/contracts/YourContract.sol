//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract YourContract {
    string public greeting;

    constructor(string memory _greeting) {
        console.log("Deploying YourContract with greeting:", _greeting);
        greeting = _greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function bla() public view returns (string memory) {
        return greeting;
    }
}
