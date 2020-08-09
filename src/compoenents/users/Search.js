import React from "react";

class Search extends React.Component {
  state = {
    text: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text !== "") {
      this.props.search(this.state.text);
      console.log(this.props);
    } else {
      this.props.setalert("Enter the name you want to search for", "light");
    }
  };
  onChange = (e) => this.setState({ text: e.target.value });

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {this.props.length > 0 && (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clear}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
