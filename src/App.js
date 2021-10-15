import { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component.jsx';
import { SearchBox } from './components/search-box/search-box.component';


class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [ ], // start with empty state, then after componentDidMount(), fetch and update state
      searchField: '',
    }
    // would need to bind if not an ES6 arrow function:
    // this.handleChange = this.handleChange.bind(this);
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      //console.log(users);
      this.setState ({
        monsters : users
      })
    }
    );
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value })
  }

  
  render() {

    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchField.toLowerCase()));
   
    return(
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder='Search Monsters'
          handleChange={e=>this.handleChange(e)}
        />
        
        <CardList name='cardlisttest' monsters={filteredMonsters} >
          {/*<h1>these are props.children from the App Component</h1>*/}
        </ CardList>
            
          <button onClick={()=> this.setState({ monsters:null })}>
            Change Text
          </button>
      </div>

    ) 
  }
}

export default App;
