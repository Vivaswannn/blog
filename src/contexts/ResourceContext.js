import { createContext } from 'react';

export const ResourceContext = createContext({
  resources: [],
  addResource: () => {},
  likeResource: () => {},
  getResourcesByTopic: () => {}
});