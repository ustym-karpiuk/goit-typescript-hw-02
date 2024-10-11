import axios, { AxiosResponse } from 'axios';

const API_KEY = 'rDOImWP92OhwALKRHVgt-1i4yDIIm4a7QmhiQ4wrRkY';
const BASE_URL = 'https://api.unsplash.com/';

const unsplashAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
});

export interface ImageResult {
  description: string;
  id: string;
  alt_description: string;
  urls: {
    regular: string;
    full: string;
  };
}

export interface PhotoSearchResult {
  total: number;
  total_pages: number;
  results: ImageResult[];
}

async function fetchPhotoSearch(
  query: string,
  page: number
): Promise<PhotoSearchResult> {
  const response: AxiosResponse<PhotoSearchResult> = await unsplashAPI.get(
    'search/photos/',
    {
      params: { query, page, per_page: 20 },
    }
  );

  return response.data;
}

export default fetchPhotoSearch;
