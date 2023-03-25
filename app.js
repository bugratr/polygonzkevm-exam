const contractAddress = '0x1dAF30bD15C01F7A28c7439fd699be0a34C8E3F1';
const abi = [
  [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_text",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_answer",
				"type": "uint256"
			}
		],
		"name": "addQuestion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_questionIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_answer",
				"type": "uint256"
			}
		],
		"name": "submitAnswer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "questions",
		"outputs": [
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "answer",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "answered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
];

let web3;
let examContract;

async function connectMetamask() {
  const provider = await detectEthereumProvider();
  if (provider) {
    web3 = new Web3(provider);
    try {
      await provider.request({ method: 'eth_requestAccounts' });
      console.log('Connected to Metamask');
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Please install MetaMask!');
  }
}

async function loadQuestions() {
  const questionCount = await examContract.methods.questions.length().call();
  const questionTable = document.getElementById('question-table');
  questionTable.getElementsByTagName('tbody')[0].innerHTML = '';

  for (let i = 0; i < questionCount; i++) {
    const question = await examContract.methods.questions(i).call();
    const row = questionTable.insertRow();
    const questionCell = row.insertCell();
    questionCell.appendChild(document.createTextNode(question.text));
    const answerCell = row.insertCell();
    answerCell.appendChild(document.createTextNode(question.answer));
    
    const buttonCell = row.insertCell();
    const answerButton = document.createElement('button');
    answerButton.className = 'btn btn-primary';
    answerButton.innerText = 'Cevapla';
    answerButton.addEventListener('click', async () => {
      const answer = prompt('Lütfen cevabınızı girin:');
      if (answer !== null) {
        const result = await examContract.methods.submitAnswer(i, answer).send({ from: web3.eth.accounts[0] });
        if (result) {
          alert('Doğru cevap!');
        } else {
          alert('Yanlış cevap!');
        }
      }
    });
    buttonCell.appendChild(answerButton);
  }

  document.getElementById('loading-message').style.display = 'none';
}

window.onload = async () => {
  connectMetamask();
  examContract = new web3.eth.Contract(abi, contractAddress);
  loadQuestions();
}
