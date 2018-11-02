import React, { PureComponent } from 'react';
import { callAPI } from './services/api';
import './gist.css';
import GistForm from './GistForm';
import { Button } from 'react-bootstrap';

class Gist extends PureComponent {
  state = {
    foundGist: {},
    loading: true
  };
  async componentDidMount() {
    const { gistID } = this.props.match.params;
    let foundGist;
    try {
      foundGist = await callAPI('get', `http://localhost:3000/gists/${gistID}`);
      this.setState({ foundGist: foundGist, loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  handleDelete = async e => {
    window.alert(
      `Are you sure you want to delete ${this.state.foundGist.filename}?`
    );
    const { gistID } = this.props.match.params;
    try {
      await callAPI('DELETE', `http://localhost:3000/gists/${gistID}`);
      window.alert(`${this.state.foundGist.filename} deleted.`);
      this.props.history.push('/gists');
      // ideally we shouldn't need to use a reload
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    let fileName = this.state.foundGist.filename;
    let description = this.state.foundGist.description;
    let content = this.state.foundGist.content;

    return (
      <div>
        <div className="found_gist">
          <p id="gist_description">{description}</p>
          <div className="gist_info">
            <h6>{fileName}</h6>
            <p>{content}</p>
            <Button
              id="delete_button"
              onClick={this.handleDelete}
              bsStyle="danger"
              bsSize="small"
            >
              DELETE
            </Button>
          </div>
        </div>
        <GistForm
          update={true}
          foundGist={this.state.foundGist}
          gistID={this.props.match.params.gistID}
        />
      </div>
    );
  }
}
export default Gist;
