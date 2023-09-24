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

const handleFormSubmit = async (e) => {
  try {
    const response = await axios.post(
      "http://localhost/digi-dairy-apis/v1/login",
      {
        email: "admin@gmail.com",
        user_password: "admin",
      }
    );
    console.log(response.data.token);
    console.log(response.data.user.user_type);
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await axios.post(
      "http://localhost/digi-dairy-apis/v1//supplier/get-suppliers"
    );
    console.log("Get suppliers", response);
  } catch (error) {
    console.log(error);
  }
};

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
            followers <br></br>
            {profile.followers}
          </div>
          <div>
            following <br></br>
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
    handleFormSubmit();
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
      </div>
    );
  }
}

export default App;
