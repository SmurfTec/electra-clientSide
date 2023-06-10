import { createInstance, LOCALSTORAGE } from 'localforage';

export const localStorage = createInstance({
  name: 'elektra',
  driver: [LOCALSTORAGE],
});
