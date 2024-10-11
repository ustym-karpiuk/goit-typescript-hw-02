import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const styles: { [key: string]: React.CSSProperties } = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Loader: React.FC = () => {
  return (
    <div style={styles.loaderContainer} aria-label="Loading spinner">
      <InfinitySpin width="200" color="#000000" />
    </div>
  );
};

export default Loader;
