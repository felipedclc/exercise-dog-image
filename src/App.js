import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(prop) {
    super(prop)

    this.saveDog = this.saveDog.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);

    this.state = {
      dogObj: undefined, // retornado pela api
      loading: true,    // chave/estado - loading   
      storedDogs: [],   // array de dogs
    }
  }

  async fetchDog() { // fetch api
    this.setState( // o que acontece após atualizar o estado
      {loading: true}, // primeiro parâmetro 
      async () => { // segundo parâmetro (apenas quando carregar o)
        const request = await fetch('https://dog.ceo/api/breeds/image/random');
        const requestObj = await request.json();
        this.setState({
          loading: false,
          dogObj: requestObj,
        });
      }); 
  }

  componentDidMount() { // onde geralmente são feitas as req api
    this.fetchDog();
  }

  /* shouldComponentUpdate(nextProps, nextState) { // avaliando se a atualização deve acontecer (true/false)
    const { message } = nextState.dogObj;
    if (message.includes("terrier")) {
      return false
    }
    return true;
  
  } */

  /* componentDidUpdate() { // salvando os dogs no local storage
    const { message } = this.state.dogObj
    localStorage.setItem("url", message);
    const dogBreed = message.split('/')[4];
    alert(`A raça do cachorro é ${dogBreed}`);
  } */

  saveDog() { 
    // salvando os dogs no array de dogs
    this.setState(({ storedDogs, dogObj }) => ({ storedDogs: [...storedDogs, dogObj] }));

    this.fetchDog();
  }

  renderDogElement() {
    const { dogObj } = this.state;
    return(
      <div>
        <img width="300px" src={dogObj.message}
          alt="random dog" /> {/* dog mais recente renderizado */}
        <div>
          <button type="button" onClick={this.saveDog}>Save dog</button>
        </div>
        <hr />
      </div> 
    );
  }

  render() {
    const { storedDogs, loading } = this.state;
    const loadingElement = <span>Loading...</span>;

    return (
      <div className="App">
        <header className="App-header">
          <div>
            {storedDogs ? storedDogs.map(dog => <img width="250px" height="250px"
              src={dog.message} alt="random dog"/>) : loadingElement}
          </div>

          <div>
            {loading ? loadingElement : this.renderDogElement()}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
