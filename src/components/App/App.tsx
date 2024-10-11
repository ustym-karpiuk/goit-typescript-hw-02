import { useState, useEffect, useRef } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import fetchPhotoSearch, { PhotoSearchResult } from '../../api/unsplash-api';
import ImageGallery, { ImageItem } from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';

import css from './App.module.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<boolean>(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data: PhotoSearchResult = await fetchPhotoSearch(
          searchQuery,
          page
        );
        if (!data.total_pages) {
          setError(true);
          setErrorText('No search results found ...');
        }

        const transformedImages: ImageItem[] = data.results.map(result => ({
          id: result.id,
          urls: result.urls,
          description: result.description || '',
        }));

        setTotalPage(page < data.total_pages);
        setImages(prevImages => [...prevImages, ...transformedImages]);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(true);
        setErrorText('Oops! Something went wrong! Reload!');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchQuery, page]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [page, images]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalOpen = ({
    bigUrl,
    description,
  }: {
    bigUrl: string;
    description: string;
  }) => {
    setSelectedImg(bigUrl);
    setDescription(description);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setSelectedImg('');
    setDescription('');
    setModalIsOpen(false);
  };

  return (
    <div ref={contentRef} className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleModalOpen} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={errorText} />}
      {images.length > 0 && totalPage && !isLoading && (
        <LoadMoreBtn onClick={handleMore} />
      )}
      <ImageModal
        bigUrl={selectedImg}
        isOpen={modalIsOpen}
        description={description}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default App;
