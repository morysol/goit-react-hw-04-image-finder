import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27219391-602be5e609794f999d4badcc3';
const QUERY_STRING = 'yellow+flowers';
const IMAGE_TYPE = 'photo';
const PAGE_NUMBER = 1;
const PER_PAGE = 12;
// const LANG = 'en';

export async function getGallery(page = PAGE_NUMBER, q = QUERY_STRING) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${q}&image_type=${IMAGE_TYPE}&page=${page}&per_page=${PER_PAGE}`
    );
    return response.data;
  } catch (error) {
    console.error(' --->  fetch error is  ', error);
  }
}
