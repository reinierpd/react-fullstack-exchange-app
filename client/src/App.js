import React, {Component} from 'react';
import Select from 'react-select';
import logo from './logo.svg';
import services from './services.js'
import Card from './components/Card/Card'
import './App.css';

class App extends Component {
  state = {
    loading: false,
    products: [],
    selectedOption: null
  };

  componentDidMount() {
    this.setState({loading: true});
    services.products()
      .then(({products}) => this.setState({products, loading: false}))
      .catch((error) => {
        console.log(error);
        this.setState({loading: false});
      });
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption});
    console.log(`Option selected:`, selectedOption);

  };

  renderProducts() {
    const {products, selectedOption} = this.state;
    const options = products.map(({id}) => ({value: id, label: id}));
    return this.state.loading ? <p>Loading...</p> :
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
  }

  renderPrices() {
    return <div className="App-row App-cards">
      <Card title="Hi" price="21"/>
      <Card title="Hi" price="21"/>
      <Card title="Hi" price="21"/>
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
