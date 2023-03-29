// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarket is Ownable {
    struct Offer {
        bool isForSale;
        uint256 tokenId;
        address seller;
        uint256 price;
        address erc20Token;
    }

    IERC721 public nftContract;
    mapping(uint256 => Offer) public tokenIdToOffer;

    event OfferCreated(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price,
        address erc20Token
    );
    event OfferCancelled(uint256 indexed tokenId);
    event NFTSold(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 price,
        address erc20Token
    );

    constructor(address _nftContractAddress) {
        nftContract = IERC721(_nftContractAddress);
    }

    function createOffer(
        uint256 _tokenId,
        uint256 _price,
        address _erc20Token
    ) public {
        require(
            nftContract.ownerOf(_tokenId) == msg.sender,
            "You are not the owner of the NFT."
        );
        nftContract.transferFrom(msg.sender, address(this), _tokenId);
        tokenIdToOffer[_tokenId] = Offer(
            true,
            _tokenId,
            msg.sender,
            _price,
            _erc20Token
        );
        emit OfferCreated(_tokenId, msg.sender, _price, _erc20Token);
    }

    function cancelOffer(
        uint256 tokenId,
        uint256 price,
        address erc20Token
    ) public {
        require(
            nftContract.ownerOf(tokenId) == msg.sender,
            "Only the owner can create an offer."
        );
        nftContract.transferFrom(msg.sender, address(this), tokenId);

        Offer memory offer = Offer(
            true,
            tokenId,
            msg.sender,
            price,
            erc20Token
        );
        tokenIdToOffer[tokenId] = offer;

        emit OfferCreated(tokenId, msg.sender, price, erc20Token);
    }

    function cancelOffer(uint256 tokenId) public {
        Offer memory offer = tokenIdToOffer[tokenId];
        require(offer.isForSale, "The token is not for sale.");
        require(
            offer.seller == msg.sender,
            "Only the seller can cancel the offer."
        );

        nftContract.transferFrom(address(this), msg.sender, tokenId);
        delete tokenIdToOffer[tokenId];

        emit OfferCancelled(tokenId);
    }

    function buyNFT(uint256 tokenId) public payable {
        Offer memory offer = tokenIdToOffer[tokenId];
        require(offer.isForSale, "The token is not for sale.");
        require(
            offer.erc20Token == address(0)
                ? msg.value >= offer.price
                : IERC20(offer.erc20Token).balanceOf(msg.sender) >= offer.price,
            "Insufficient funds."
        );

        if (offer.erc20Token == address(0)) {
            // Pay with ETH
            payable(offer.seller).transfer(offer.price);
        } else {
            // Pay with ERC20 token
            IERC20(offer.erc20Token).transferFrom(
                msg.sender,
                offer.seller,
                offer.price
            );
        }
        nftContract.transferFrom(address(this), msg.sender, tokenId);
        delete tokenIdToOffer[tokenId];

        emit NFTSold(
            tokenId,
            msg.sender,
            offer.seller,
            offer.price,
            offer.erc20Token
        );
    }

    function getOffer(uint256 tokenId) public view returns (Offer memory) {
        return tokenIdToOffer[tokenId];
    }

    function setNFTContractAddress(address _nftContractAddress)
        public
        onlyOwner
    {
        nftContract = IERC721(_nftContractAddress);
    }
}
