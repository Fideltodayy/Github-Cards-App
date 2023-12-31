import React from "react";
import axios from "axios";
const testData = [
  {
    name: "Fidel Otieno",
    id: 113513351,
    avatar_url: "https://avatars.githubusercontent.com/u/113513351?v=4",
    company: "Life-long learner",
    followers: "30",
    following: "20",
  },
];

const CardList = (props) => {
  return (
    <div className="card-container">
      {props.profiles.map((profile) => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
};

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img
          src={profile.avatar_url}
          alt="Profile "
          style={{ width: "60px" }}
        />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
          <div>
            <span style={{ textDecoration: "underline" }}>followers</span>{" "}
            <br />
            {profile.followers}
          </div>
          <div>
            <span style={{ textDecoration: "underline" }}>following</span>{" "}
            <br />
            {profile.following}
          </div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: "" };

  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(resp.data);
    console.log(resp.data);
    this.setState({ userName: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="Search Github Username"
          required
        />
        <button type="submit">Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: testData,
  };
  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
        <footer>
          Made with {"\u2764"} by ~
          <a href="https://twitter.com/Fideltodayy" target="blank">
            Fideltodayy
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
