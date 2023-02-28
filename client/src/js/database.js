import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  console.error('putDb not implemented');
  // Create a connection to the database database and version we want to use.
  const snippetsDb = await openDB('snippets', 1);
  // Create the transaction and have ability to perform R and U CRUD operations
  const tx = snippetsDb.transaction('snippets', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('notes');
  // Use the .add() method on the store and pass in the content
  const request = store.add({ content: content });
  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};


export const getDb = async () => {
  console.error('getDb not implemented');

  const snippetsDb = await openDB('snippets', 1);
  // Setting data priveleges to read only for getDb
  const tx = snippetsDb.transaction('snippets', 'readonly');
  const store = tx.objectStore('snippets');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
