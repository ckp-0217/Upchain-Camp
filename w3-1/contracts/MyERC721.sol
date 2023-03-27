// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyErc721 is ERC721 {
    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {
        _mint(msg.sender, 0);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmRFSqyfvUZf7Nrn9EMXMA1emgJXocTvXXm8iKZGUj6bVw/";
    }
}
