// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


interface IScore {
    function setScore(address, uint) external;
}

contract score is IScore {
    address immutable owner = msg.sender;
    mapping(address => uint256) public scores;
    mapping(address => bool) public teachers;

    event SetScore(
        address indexed teacher,
        address indexed student,
        uint256 score
    );
    modifier isTeacher() {
        require(teachers[msg.sender], "You are not a teacher.");
        _;
    }
    modifier isOwner() {
        require(msg.sender == owner, "You are not owner.");
        _;
    }

    function setScore(address _student, uint _score) external isTeacher {
        require(_score <= 100, "Illegal score");
        scores[_student] = _score;
        emit SetScore(msg.sender, _student, _score);
    }

    function setTeacher(address _teacher) external isOwner {
        teachers[_teacher] = true;
    }
}

contract teacher {
    IScore public immutable scoreAddress;

    constructor(address _scoreAddress) {
        scoreAddress = IScore(_scoreAddress);
    }

    function setScore(address _student, uint _score) external {
        scoreAddress.setScore(_student, _score);
    }
}
