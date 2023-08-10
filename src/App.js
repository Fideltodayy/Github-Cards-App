import React from "react";
import logo from "./0J0A0822.jpg"

const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

const CardList = (props) => {
  return (
    <div>
      {props.profiles.map(profile => (
        <Card {...profile}/>
      ))}
    </div>
  )
}

class Card extends React.Component {
  render() {
    const profile = this.props;
    return(
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    )
  }
}

class Form extends React.Component {
  state = { userName: ''};
  handleSubmit = (event) => {
    event.preventDefault();
    console.log( this.state.userName);
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.state.userName} 
          onChange={event => this.setState({userName: event.target.value})} 
          placeholder="Github Username" 
          required
        /> 
        <button type="submit">Add Card</button>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // this is the state of our component, it's an object with properties and values
    this.state={
      profiles: testData,
    };
  }
  render(){
    return(
      <div>
        <div className="header">{this.props.title}</div>
        <Form/>
        <CardList profiles={this.state.profiles} />
      </div>
    )
  }
}

export default App;
