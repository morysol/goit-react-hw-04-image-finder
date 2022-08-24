import React, { Component } from 'react';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Circles } from 'react-loader-spinner';
//
import { MainApp } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { getGallery } from '../services/fetchGallery/fetchGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';

//
import { BigPicture } from './Overlay/Overlay';

class App extends Component {
  state = {
    currentPage: 1,
    searchPattern: '',
    imageGallery: [],
    totalHits: 0,
    largeImageURL: '',
    isLoading: false,
    isOverlay: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchPattern !== this.state.searchPattern
    ) {
      const { currentPage: page, searchPattern: q } = this.state;

      this.setState({ isLoading: true });
      const response = await getGallery(page, q);

      const imageGallery = response.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      // console.log(imageGallery);

      this.setState({
        totalHits: response.totalHits,
        isLoading: false,
      });
      this.setState(prevState => {
        // return { imageGallery: [...prevState.imageGallery, ...response.hits] };
        return {
          imageGallery: [...prevState.imageGallery, ...imageGallery],
        };
      });
    }
  }

  getSearchPattern = newPattern => {
    this.setState({ imageGallery: [] });
    this.setState({ currentPage: 1 });
    this.setState({ searchPattern: newPattern });
  };

  nextPage = () => {
    this.setState(prevState => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
  };

  onImageClick = id => {
    const largeImageURL = this.state.imageGallery.find(
      elem => elem.id === id
    ).largeImageURL;

    this.setState({ largeImageURL });
    this.toggleOverlay();
  };

  toggleOverlay = () => {
    this.setState(prevState => {
      return { isOverlay: !prevState.isOverlay };
    });
  };

  closeOverlay = e => {
    if (e.target === e.currentTarget) {
      this.toggleOverlay();
    }
  };

  render() {
    const {
      imageGallery,
      totalHits,
      currentPage,
      isLoading,
      isOverlay,
      largeImageURL,
    } = this.state;

    return (
      <MainApp>
        <SearchBar onSearch={this.getSearchPattern}></SearchBar>
        {imageGallery.length > 0 && (
          <ImageGallery
            imageGallery={imageGallery}
            onImageClick={this.onImageClick}
          />
        )}
        {isLoading && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Circles
              height="100"
              width="100"
              color="#f00000"
              ariaLabel="loading"
            />
          </div>
        )}
        {imageGallery.length > 0 && currentPage * 12 < totalHits && (
          <LoadMoreBtn type="button" onButton={this.nextPage} />
        )}
        {
          isOverlay && (
            <BigPicture link={largeImageURL} closeOverlay={this.closeOverlay} />
          )
          // PortalReactDOM.createPortal(
          //   <React.StrictMode>
          //     {
          //       <BigPicture
          //         link={largeImageURL}
          //         closeOverlay={this.closeOverlay}
          //       />
          //     }
          //   </React.StrictMode>,
          //   document.getElementById('portal-root')
          // )
        }
      </MainApp>
    );
  }
}

export default App;
