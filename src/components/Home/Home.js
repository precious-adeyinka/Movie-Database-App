import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import { HeroCaption } from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  }

  componentDidMount() {
    // Clear Web Storage
    window.sessionStorage.clear();

    if (sessionStorage.getItem('HomeState')) {
      let state = JSON.parse(sessionStorage.getItem('HomeState'))
      this.setState({ ...state })
    } else {
      this.setState({ loading: true })
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
  }

  searchItems = (searchTerm) => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  }

  loadMoreItems = () => {
    // ES6 Destructuring the state
    const { searchTerm, currentPage } = this.state;

    let endpoint = '';
    this.setState({ loading: true })

    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    // ES6 Destructuring the state
    const { movies, heroImage, searchTerm } = this.state;

    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      this.setState({
        movies: [...movies, ...result.results],
        heroImage: heroImage || result.results[((Math.floor(Math.random() * (result.results.length - 1)) + 1))],
        loading: false,
        currentPage: result.page,
        totalPages: result.total_pages
      }, () => {
        // Remember state for the next mount if we´re not in a search view
        if (searchTerm === "") {
          sessionStorage.setItem('HomeState', JSON.stringify(this.state));
        }
      })
    })
    .catch(error => console.error('Error:', error))
  }

  render() {
    // ES6 Destructuring the state
    const { movies, heroImage, loading, currentPage, totalPages, searchTerm } = this.state;

    return (
      <div className="rmdb-home">
        {/* Before Content */}
        {/* Background */}
        <div className="beforeContent">
          {/* Image */}
          {heroImage ? 
            (
              <React.Fragment>
                <HeroCaption 
                  title={heroImage.original_title}
                  text={heroImage.overview}
                  url={heroImage.id}
                />
                <div className="caption">
                  <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    // title={heroImage.original_title}
                    // text={heroImage.overview}
                  />
                </div>
              </React.Fragment>
            ) : null 
          }

          {/* Gradient */}
          <div className="insideContent"></div>
        </div>

        {/* Main Content */}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={loading}
          >
            {movies.map( (element, i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                movieId={element.id}
                movieName={element.original_title}
              />
            ))}
          </FourColGrid>

          {loading ? <Spinner /> : null}
          
          {(currentPage <= totalPages && !loading) ?
            <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
            : null
          }
        </div>
        
        {/* Search Component */}
        <SearchBar callback={this.searchItems}/>
        {/* Show Search Bar Component */}
        <div clasName="showSearchComponentBtn" onClick={this.openSearchComponent}><i className="fa fa-search"></i></div>
      </div>
    )
  }
}

export default Home;