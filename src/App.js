import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
//const ethers = require("ethers")
import logo from './logo.svg';
import './App.css';


function App (){
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;

	const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
		const { ethereum } = window;
		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				sethaveMetamask(false);
			}
			sethaveMetamask(true);
		};
		checkMetamaskAvailability();
	}, []);

  const connectWallet = async () => {
		try {
			if (!ethereum) {
				sethaveMetamask(false);
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			setAccountAddress(accounts[0]);
			setIsConnected(true);
		} catch (error) {
			setIsConnected(false);
		}
	};
  return(
	<div className="App">
	<header className="App-header">
		{haveMetamask ? (
			<div className="App-header">
				{isConnected ? (
					<div className="card">
						<div className="card-row">
							<h3>Wallet Address:</h3>
							<p>
								{accountAddress}
					
							</p>
						</div>
						<div className="card-row">
							
						</div>
					</div>
				) : (
					<img src={logo} className="App-logo" alt="logo" />
				)}

				{isConnected ? (
					<p className="info"> Connected Successfully</p>
				) : (
					<button className="btn" onClick={connectWallet}>
						Conecte seu metamask
					</button>
				)}
			</div>
		) : (
			<p>Please Install MataMask</p>
		)}
	</header>
</div>)
}

/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
*/
export default App;
