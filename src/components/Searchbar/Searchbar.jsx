import { useState } from 'react';
import PropTypes from 'prop-types'; // ES6

import {
  Header,
  SearchForm,
  SearchFormBtn,
  Input,
  SearchLabel,
} from './Searchbar.styled';

const SearchBar = ({ onSearch }) => {
  const [inputString, setInputString] = useState('');

  const handleInput = e => {
    setInputString(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputString === '') {
      return;
    }
    onSearch(inputString);
    setInputString('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchFormBtn>

        <Input
          onChange={handleInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputString}
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
