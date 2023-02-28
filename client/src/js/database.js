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
  console.log('putDb not implemented');
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create the transaction and have ability to perform R and U CRUD operations
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .put() method on the store and pass in the content
  const request = store.put({ content: content });
  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};


export const getDb = async () => {
  console.log('getDb not implemented');

  const jateDb = await openDB('jate', 1);
  // Setting data priveleges to read only for getDb
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.content', result);
  return result;
};

initdb();
