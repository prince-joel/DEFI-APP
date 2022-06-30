import {Tabs, Tab} from 'react-bootstrap'
import miniBank from '../abis/miniBank.json';
import React, {Component} from 'react';
import Token from '../abis/Token.json';
import Web3 from 'web3';
import './App.css';
import './index.js';

class App extends Component {
    async componentWillMount() {
        await this.loaBlockchainData(this.props.dispatch)
    }

    async loadBlockchainData(dispatch) {
      // check is MetaMask exists 
      if(typeof window.ethereum!=='undefined'){
        const web3 = new Web3(window.ethereum)
        // assign values to variables: web3, netId, acounts
        const netId =await web3.eth.net.getId()
        // check if account is detected, then load balance $ set states, else push alert
        const accounts = await web3.eth.getAccounts()
// load balance
      if(typeof accounts[0] !=='undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
        
      } else {
        window.alert('please login with MetaMask')
      }
      // in try block load contracts(Token and Bank)
      try {
      const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
      const Bank = new web3.eth.Contract(miniBank.abi, miniBank.networks[netId].address)
      const miniBankAddress = miniBank.networks[netId].address
      this.setState({token: token, bank: Bank, miniBankAddress: miniBankAddress})
    }catch (e) {
      console.log('error', e)
      window.alert('contract not deployed to curreent network')
    }
 
      } else {
        window.alert('please install MetaMask')
      }



        // if MetaMask does not exist push alert
    }

    async deposit(amount) {
      // check if this.state.miniBank is ok
      if(this.state.Bank!=='undefined'){
        try{
          await this.state.Bank.methods.withdraw().send({value: amount.toString(), form: this.state.account})
        } catch (e) {
          console.log('error, deposit', e)
        }
      }

    }

    async withdraw(amount) {
      // prevent button from default click
      e.preventDefault()
      if(this.state.Bank!=='undefined'){
        try{
          await this.state.Bank.methods.deposit().send({value: amount.toString(), form: this.state.account})
        } catch (e) {
          console.log('error, deposit', e)
        }
      }

    }

    constructor(props) {
        super(props)
        this.state = {
            web3: 'undefined',
            account: '',
            token: null,
            miniBank: null,
            balance: 0,
            miniBankAddreess: null
        }
    }

    render() {
        return (
            <div className='text-monospace'>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                  <a
                  className="navbar-brand col-sm-3 col-md-2 mr-0"
                  href=""
                  target="blank"
                  rel="noopener noreferrer"
                  >
                  <img src=""/>
                  <b>miniBank</b>
                  </a>
                </nav>
                <div className='container-fluid mt-5 text-center'>
                  <br></br>
                  <h1>Welcon to MINI BANK</h1>
                  <h2>{this.state.account}</h2>
                  <br></br>
                  <div className='row'>
                    <main role="main" className='col-lg-12 d-flex text-center'>
                      <div className="content mr-auto ml-auto">
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                          <Tab eventKey="deposit" title="Deposit">
                            <div>
                              <br></br>
                              How much do you want to deposit?
                              <br></br>
                              (min.amount is 0.01 ETH)
                              <br></br>
                              (1 deposit is possible at the time)
                              <br></br>
                              <form onSubmit={(e) =>{
                                e.preventDefault()
                                let amount = this.depositAmount.value
                                amount = amount* 10**18  /*convert to wei*/
                                this.deposit(amount)
                              }}>
                                <div className='form-group mr-sm-2'>
                                  <br></br>
                                  <input
                                  id='depositAmount'
                                  step="0.01"
                                  type='number'
                                  className='form-control form-control-md'
                                  placeholder='amount...'
                                  required
                                  ref={(input) => {this.depositAmount = input}}
                                  />
                                </div>
                                <button type='submit' className='btn btn-primary'>DEPOSIT</button>
                              </form>
                            </div>
                          </Tab>
                          <Tab eventKey="withdraw" title="Withdraw">
                            
                              <br></br>
                              How much do you want to withdraw?
                              <br></br>
                              <br></br>
                              <div>
                                <button type='submit' className='btn btn-primary' onClick={(e) => this.withdraw(e)}>WITHDRAW</button>
                              </div>
                            
                          </Tab>
                        </Tabs>
                      </div>
                    </main>
                  </div>
                </div>
            </div>
        )
    }
}
export default App;