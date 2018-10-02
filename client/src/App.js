import React, {Component} from 'react';
import Select from 'react-select';
import logo from './logo.svg';
import services from './services.js'
import Card from './components/Card/Card'
import './App.css';

class App extends Component {
  state = {
    loadingProducts: false,
    products: [],
    selectedOption: null,
    selectedPrices: [],
    loadingPrices: false
  };

  componentDidMount() {
    this.setState({loadingProducts: true});
    services.products()
      .then(({products}) => this.setState({products, loadingProducts: false}))
      .catch((error) => {
        console.log(error);
        this.setState({loadingProducts: false});
      });
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption, selectedPrices: [], loadingPrices: true});
    console.log(`Option selected:`, selectedOption);
    services.allPrices(selectedOption.value)
      .then(prices => {
        console.log(prices);
        const sorted = [...prices].sort((a, b) => a.price - b.price);
        this.setState({selectedPrices: sorted, loadingPrices: false})
      })
      .catch((error) => {
        console.log(error);
        this.setState({loadingPrices: false});
      });
  };

  renderProducts() {
    const {products, selectedOption, loadingProducts} = this.state;
    const options = products.map(({id}) => ({value: id, label: id}));
    return loadingProducts ? <p>Loading Products...</p> :
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
  }

  renderPrices() {
    const {selectedPrices, loadingPrices} = this.state;
    const count = selectedPrices.length;
    return loadingPrices ? <p>Loading prices...</p> :
      <div className="App-row App-cards">
        {selectedPrices.map((item, index) => (
          <Card key={item.store}>
            <h4>{item.store}</h4>
            <p
              className={`${index === 0 && 'App-text-red'}  ${index === (count - 1) && 'App-text-green'}`}>
              {item.price}
              </p>
          </Card>)
        )}
      </div>
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Exchange Currency</h1>
        </header>
        <div className="App-container">
          <div className="App-row">
            <div className="App-col-md-3">
              <h3>Select Product</h3>
              {this.renderProducts()}
            </div>
          </div>
          <div className="App-row">
            {this.renderPrices()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
