import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category:'general',
    heading: 'Top Headlines'
  }

  static propTypes = { 
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    heading: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {

    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=61a28a2e59024d679fc99b75a010a6db&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();

    this.setState({ 
      articles: parseData.articles, 
      loading: false,
      totalResults: parseData.totalResults
      });
  };

  // Check if the next page number is not greater than the total number of pages
  // (totalResults divided by 20, rounded up). If it's a valid page, update the state
  // to the next page and fetch news for the new page.
  handleNextClick = async () => {

  
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    {
         this.setState(
          (prevState) => ({ page: prevState.page + 1 }),
          this.fetchNews
        );
    }
    
  };

  handlePreviousClick = async () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.fetchNews
    );
  };

  render() {
    return (
      <div className="container my-3">
        <h1 style={{ textAlign: "center", margin: "20px" }}>NewsMonkey - {this.props.heading}</h1>
        <br />
        {this.state.loading && <Spinner/>}
        <div className="row">
          <br />

           { !this.state.loading && this.state.articles.map((article) => (
              <div key={article.url} className="col-md-4">
                <NewsItem
                  title={article.title ? article.title.slice(0, 44) : ""}
                  description={article.description ? article.description.slice(0, 100) : ""}
                  publishedAt={article.publishedAt }
                  author={article.author}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  source={article.source.name}
                />
              </div>
            ))
         }
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-6"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            className="btn btn-dark mx-6"
            onClick={this.handleNextClick}
          >
            &rarr; Next
          </button>
        </div>
        <br />
      </div>
    );
  }
}

export default News;
