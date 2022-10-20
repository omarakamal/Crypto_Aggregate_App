import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import './Main.css';


class Main extends Component {
    constructor(){
        super();
        this.state = {
            coinsArray:[],
            searchTerm:""
        };
    }
    componentDidMount(){
        axios.get("https://api.coingecko.com/api/v3/coins")
        .then(results=>{
            const coinsArray= results.data;
            this.setState({coinsArray})
            // console.log(coins)
            // console.log(myCoin)
        })
        
    }
    handleChange (e) {
      this.setState({searchTerm: e.target.value});
      console.log(this.state.searchTerm)
      // axios.get(`https://api.coingecko.com/api/v3/coins/${this.state.searchTerm}`)
      // .then(results=>{
    
      // })


    }
  
    handleRefresh(){
      axios.get("https://api.coingecko.com/api/v3/coins")
      .then(results=>{
          const coinsArray= results.data;
          this.setState({coinsArray})
          // console.log(coins)
          // console.log(myCoin)
      })
    }
  render() {
 
    if(this.state.searchTerm =""){
      return (
        <div className='tableContainer'>
                <h1 class="display-4 font-weight-bold mb-4" id="header">Crypto Coin Aggregate Site</h1>

            <br></br>
           
           <input
            id="searchBar"
            onChange={(e) => {this.handleChange(e)}} ref={(input)=> this.myinput = input}
            placeholder="Search for Coin"
          />     
            

            <button onClick={this.handleRefresh} id="refreshButton">Refresh</button>
            <br></br>
            <br></br>

            <Table striped bordered hover variant="dark" id="mainTable">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Coin Name</th>
            <th>Coin Symbol</th>
            <th>price US Dollars</th>
            <th>Last Updates</th>
            <th>price change</th>

          </tr>
        </thead>
        <tbody>
   

                {this.state.coinsArray.map((coinData) => (
                  <tr key={coinData.id}>
                   <td><img src={coinData.image.small}></img></td>
            <td>{coinData.symbol}</td>
            <td>{coinData.name}</td>
            <td>${coinData.market_data.current_price.usd}</td>
            <td>{coinData.last_updated}</td>
           {coinData.market_data.price_change_24h < 0 ? (
              <td id="negativeChange">↓ ${coinData.market_data.price_change_24h.toFixed(2)}</td>
            ) : (
              <td id="positiveChange">↑ ${coinData.market_data.price_change_24h.toFixed(2)}</td>
            )}
                  </tr>
                ))}
              </tbody>
      </Table>
       
      </div>
    )
    }
    else{
      {this.state.coinsArray.filter(()=>{
        if(this.state.searchTerm == ""){
          console.log("everything")

        }
        else(this.state.coinsArray.id.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        console.log("1 or 2")
      }
        )}
      return(
        <div className='tableContainer'>
        <h1 class="display-4 font-weight-bold mb-4" id="header">Crypto Coin Aggregate Site</h1>

    <br></br>
   
   <input
    id="searchBar"
    onChange={(e) => {this.handleChange(e)}} ref={(input)=> this.myinput = input}
    placeholder="Search for Coin"
  />     
    

    <button onClick={this.handleRefresh} id="refreshButton">Refresh</button>
    <br></br>
    <br></br>

    <Table striped bordered hover variant="dark" id="mainTable">
<thead>
  <tr>
    <th>Icon </th>
    <th>Coin Name</th>
    <th>Coin Symbol</th>
    <th>price US Dollars</th>
    <th>Last Updates</th>
    <th>price change</th>

  </tr>
</thead>
<tbody>


        {this.state.coinsArray.map((coinData) => (
          <tr key={coinData.id}>
           <td><img src={coinData.image.small}></img></td>
    <td>{coinData.symbol}</td>
    <td>{coinData.name}</td>
    <td>${coinData.market_data.current_price.usd}</td>
    <td>{coinData.last_updated}</td>
   {coinData.market_data.price_change_24h < 0 ? (
      <td id="negativeChange">↓ ${coinData.market_data.price_change_24h.toFixed(2)}</td>
    ) : (
      <td id="positiveChange">↑ ${coinData.market_data.price_change_24h.toFixed(2)}</td>
    )}
          </tr>
        ))}
      </tbody>
</Table>

</div>
      )
    }
    
  }
}

export default Main