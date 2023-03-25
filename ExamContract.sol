// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ExamContract {
  using SafeMath for uint256;

  struct Question {
    string text;
    uint256 answer;
    bool answered;
  }

  Question[] public questions;

  function addQuestion(string memory _text, uint256 _answer) public {
    questions.push(Question({text: _text, answer: _answer, answered: false}));
  }

  function submitAnswer(uint256 _questionIndex, uint256 _answer) public returns (bool) {
    require(_questionIndex < questions.length, "Invalid question index");
    require(!questions[_questionIndex].answered, "This question has already been answered");
    if (_answer == questions[_questionIndex].answer) {
      questions[_questionIndex].answered = true;
      return true;
    }
    return false;
  }
}
