// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTMas is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    event Minted(address from, address to, uint256 tokenId, string tokenUri);

    Counters.Counter private _tokenIdCounter;
    uint256 public mintPerAddressLimit = 10;
    mapping(address => uint256) public addressMintedBalance;

    constructor() ERC721("NFTMas", "NMAS") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function _baseExtension() internal pure returns (string memory) {
        return "/metadata.json";
    }

    function mintGift(address to, string memory uri) public {
        require(
            addressMintedBalance[msg.sender] < mintPerAddressLimit,
            "maximum per address minted"
        );
        require(msg.sender != to, "sender can't equal receiver");
        addressMintedBalance[msg.sender]++;
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit Minted(msg.sender, to, tokenId, uri);
    }

    function setMintPerAddressLimit(uint256 _mintPerAddressLimit)
        public
        onlyOwner
    {
        mintPerAddressLimit = _mintPerAddressLimit;
    }

    function resetAddressMintedBalance(address addr) public onlyOwner {
        addressMintedBalance[addr] = 0;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory tokenURIWithBase = super.tokenURI(tokenId);
        string memory baseExtension = _baseExtension();
        return string(abi.encodePacked(tokenURIWithBase, baseExtension));
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
}
