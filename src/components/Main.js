import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import './Main.css';


class Main extends Component {
    constructor(){
        super();
        this.state = {
            coinsArray:[]
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
  render() {
    return (
        <div className='tableContainer'>
            
            <Table striped bordered hover variant="dark">
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
}

export default Main