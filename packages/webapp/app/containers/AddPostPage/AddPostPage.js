import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

export default class AddPostPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      description: ""
    };
    this.onFileHandler = this.onFileHandler.bind(this);
    this.onFieldChanged = this.onFieldChanged.bind(this);
  }
  onFileHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };
  onFieldChanged = event => {
    if (event !== undefined && event.preventDefault) event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmitHandler = event => {
    if (event !== undefined && event.preventDefault) event.preventDefault();
    let image = new FormData();
    image.append("file", this.state.selectedFile);
    const data = {
      image,
      description: this.state.description
    }
    this.props.onSubmitForm(data);
  };
  render() {
    return (
      <>
        <form enctype="multipart/form-data">
          <div className="form-group">
            <div className="form-group files">
              <label>Photo</label>
              <input
                type="file"
                name="file"
                className="form-control"
                multiple=""
                onChange={this.onFileHandler}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Description</label>
            <textarea
              type="email"
              className="form-control"
              rows="3"
              onChange={this.onFieldChanged}
              name="description"
              value={this.state.description}
            />
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.onSubmitHandler}
              >
                Add post
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}
