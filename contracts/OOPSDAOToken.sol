// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*

This contract was 'writen' (re: copy and pasted an edited to make work) 
by russlamb.eth for the purposes of creating a simple voting token to 
use with our DAO. This token is only ment use in an off chain Snapshot org 
https://snapshot.org/#/code.russlamb.eth

This is version 3, bc I didn't deploy with enough 0's in v1, and 
Im having trouble making this work with gnosis rinkeby + harmony
in v2 D:
*/

contract OOPSDAOToken is ERC20, Ownable {
    constructor() 
            ERC20("OOPS Dao Token", "OOPSVote")
            {
            _mint(msg.sender, 100 * 10**18);
        }

    function mintMore(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
}