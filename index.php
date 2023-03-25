<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sınav Soruları</title>
  <script src="https://unpkg.com/@metamask/detect-provider/dist/detect-provider.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.4-rc.1/web3.min.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    integrity="sha384-OgvrTMNzZxNSqWwF+UDDPQy/K9OQLHcRJG1syKkFhjUJZwM/editVfoLkDfCKCtc"
    crossorigin="anonymous">
  <style>
    body {
      padding-top: 50px;
    }
    body {
      background-color: #f8f9fa;
    }

    .container {
      max-width: 800px;
      margin: auto;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: bold;
      text-align: center;
      margin-top: 50px;
      margin-bottom: 30px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 50px;
    }

    th,
    td {
      padding: 10px;
      text-align: left;
      vertical-align: middle;
    }

    thead th {
      background-color: #343a40;
      color: #fff;
      border-color: #454d55;
    }

    .btn-primary {
      background-color: #007bff;
      border-color: #007bff;
    }

    .btn-primary:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }

    .btn-primary:focus,
    .btn-primary.focus {
      box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
    }

    @media(max-width:768px) {
      h1 {
        font-size: 28px;
      }

      h2 {
        font-size: 24px;
      }

      table {
        font-size: 14px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Sınav Soruları</h1>
    <button id="connect-metamask" class="btn btn-primary">MetaMask Cüzdanına Bağlan</button>
    <hr>
    <h2>Soru Listesi</h2>
    <p id="loading-message">Sorular yükleniyor...</p>
    <table class="table" id="question-table">
      <thead>
        <tr>
          <th>Soru</th>
          <th>Cevap</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
  <script>
    const connectMetamaskButton = document.getElementById('connect-metamask');
    let accounts;

    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        console.log('MetaMask bulundu!');
      } else {
        alert('Lütfen MetaMask yükleyin!');
      }
    }

    const connectMetamask = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts = await web3.eth.getAccounts();
        console.log(accounts);
      } catch (error) {
        console.error(error);
      }
    }

    init();

    connectMetamaskButton.addEventListener('click', connectMetamask);
  </script>
</body>

</html>
