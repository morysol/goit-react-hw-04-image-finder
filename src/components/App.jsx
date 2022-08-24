import React, { useState, useEffect } from 'react';

import { Circles } from 'react-loader-spinner';
//
import { MainApp } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { getGallery } from '../services/fetchGallery/fetchGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';

//
import { BigPicture } from './Overlay/Overlay';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPattern, setSearchPattern] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);
  const [imageGallery, setImageGallery] = useState([]);

  //
  useEffect(() => {
    if (searchPattern === '') {
      return;
    }
    setIsLoading(true);

    async function fetchData() {
      // You can await here
      const response = await getGallery(currentPage, searchPattern);

      const filteredImageGallery = response.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      // setImageGallery([...imageGallery, ...filteredImageGallery]);
      // The functional updates pattern
      setImageGallery(imageGallery => [
        ...imageGallery,
        ...filteredImageGallery,
      ]);
      setTotalHits(response.totalHits);
      setIsLoading(false);
      // ...
    }
    fetchData();
  }, [currentPage, searchPattern]);

  const getSearchPattern = newPattern => {
    // console.log('getSearchPattern   ', newPattern);
    setImageGallery([]);
    setCurrentPage(1);
    setSearchPattern(newPattern);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onImageClick = id => {
    setLargeImageURL(imageGallery.find(elem => elem.id === id).largeImageURL);

    toggleOverlay();
  };

  const toggleOverlay = () => {
    setIsOverlay(!isOverlay);
  };

  const closeOverlay = e => {
    if (e.target === e.currentTarget) {
      toggleOverlay();
    }
  };

  return (
    <MainApp>
      <SearchBar onSearch={getSearchPattern}></SearchBar>
      {imageGallery.length > 0 && (
        <ImageGallery imageGallery={imageGallery} onImageClick={onImageClick} />
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
        <LoadMoreBtn type="button" onButton={nextPage} />
      )}
      {isOverlay && (
        <BigPicture link={largeImageURL} closeOverlay={closeOverlay} />
      )}
    </MainApp>
  );

  //
};

// class App extends Component {
//   state = {
//     currentPage: 1,
//     searchPattern: '',
//     imageGallery: [],
//     totalHits: 0,
//     largeImageURL: '',
//     isLoading: false,
//     isOverlay: false,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.currentPage !== this.state.currentPage ||
//       prevState.searchPattern !== this.state.searchPattern
//     ) {
//       const { currentPage: page, searchPattern: q } = this.state;

//       this.setState({ isLoading: true });
//       const response = await getGallery(page, q);

//       const imageGallery = response.hits.map(
//         ({ id, webformatURL, largeImageURL, tags }) => ({
//           id,
//           webformatURL,
//           largeImageURL,
//           tags,
//         })
//       );
//       // console.log(imageGallery);

//       this.setState({
//         totalHits: response.totalHits,
//         isLoading: false,
//       });
//       this.setState(prevState => {
//         // return { imageGallery: [...prevState.imageGallery, ...response.hits] };
//         return {
//           imageGallery: [...prevState.imageGallery, ...imageGallery],
//         };
//       });
//     }
//   }

//   getSearchPattern = newPattern => {
//     this.setState({ imageGallery: [] });
//     this.setState({ currentPage: 1 });
//     this.setState({ searchPattern: newPattern });
//   };

//   nextPage = () => {
//     this.setState(prevState => {
//       return {
//         currentPage: prevState.currentPage + 1,
//       };
//     });
//   };

//   onImageClick = id => {
//     const largeImageURL = this.state.imageGallery.find(
//       elem => elem.id === id
//     ).largeImageURL;

//     this.setState({ largeImageURL });
//     this.toggleOverlay();
//   };

//   toggleOverlay = () => {
//     this.setState(prevState => {
//       return { isOverlay: !prevState.isOverlay };
//     });
//   };

//   closeOverlay = e => {
//     if (e.target === e.currentTarget) {
//       this.toggleOverlay();
//     }
//   };

//   render() {
//     const {
//       imageGallery,
//       totalHits,
//       currentPage,
//       isLoading,
//       isOverlay,
//       largeImageURL,
//     } = this.state;

//     return (
//       <MainApp>
//         <SearchBar onSearch={this.getSearchPattern}></SearchBar>
//         {imageGallery.length > 0 && (
//           <ImageGallery
//             imageGallery={imageGallery}
//             onImageClick={this.onImageClick}
//           />
//         )}
//         {isLoading && (
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Circles
//               height="100"
//               width="100"
//               color="#f00000"
//               ariaLabel="loading"
//             />
//           </div>
//         )}
//         {imageGallery.length > 0 && currentPage * 12 < totalHits && (
//           <LoadMoreBtn type="button" onButton={this.nextPage} />
//         )}
//         {isOverlay && (
//           <BigPicture link={largeImageURL} closeOverlay={this.closeOverlay} />
//         )}
//       </MainApp>
//     );
//   }
// }

export default App;
