import { createContext } from 'react';

export const UserAgentContext = createContext();
export const userAgent = {
  desktop: {
    resolution: 1024,
    movies: 12,
    more: 3
  },
  tablet: {
    resolution: 768,
    movies: 8,
    more: 2
  },
  mobile: {
    resolution: 480,
    movies: 5,
    more: 2
  }
};