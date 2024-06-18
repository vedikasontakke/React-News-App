import React, { Component } from 'react';
import Spinner from './Spinner'; // Import your Spinner component

export class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true, // Track whether the image is loading
    };
  }

  handleImageLoad = () => {
    // Callback function to be executed when the image finishes loading
    this.setState({ imageLoading: false });
  };

  render() {
    const { title, description, imageUrl, author, publishedAt, newsUrl, source } = this.props;
    const { imageLoading } = this.state;

    return (
      <div className="my-3">
        <div className="card" style={{ width: "22rem", height: "30rem", display: "flex", flexDirection: "column" }}>
          {/* Conditionally render the spinner while the image is loading */}
          {imageLoading && <Spinner />}
          {/* Show image when it's loaded */}
          <img
            src={imageUrl ? imageUrl : "https://www.infidigit.com/wp-content/uploads/2022/01/News-1.png"}
            className={`card-img-top ${imageLoading ? 'd-none' : ''}`} // Hide image if loading
            style={{ width: "350px", height: "200px" }}
            alt="..."
            onLoad={this.handleImageLoad} // Call handleImageLoad when image finishes loading
          />
          <div className="card-body d-flex flex-column" style={{ flex: "1 0 auto" }}>
            <div>
              <h5 className="card-title">
                {title ? title : "Click on the Read More Button to view complete news"}...
              </h5>
              <p className="card-text">
                {description ? description : "Click on the Read More Button to view complete news"}...
              </p>
              <p className="card-text">
                <small className="text-muted">By {author ? author : "author"} on {publishedAt ? new Date(publishedAt).toGMTString() : " "}</small>
              </p>
            </div>
            <div className="mt-auto d-flex justify-content-between">
              <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">read more</a>
              <span 
                className="badge rounded-pill bg-light text-dark"
                style={{
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: "10px"
                }}>
                {source ? source : "News"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
