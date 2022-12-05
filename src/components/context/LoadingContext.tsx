import React from 'react';

const LoadingContext = React.createContext({
    loading: false,
    setLoading: (isLoading: boolean) => {}
})

export default LoadingContext;