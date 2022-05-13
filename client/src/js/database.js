import { openDB } from "idb";

const initdb = async () =>
  openDB("msdos", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("msdos")) {
        console.log("msdos database already exists");
        return;
      }
      db.createObjectStore("msdos", { keyPath: "id", autoIncrement: true });
      console.log("msdos database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("opening msdosDB");
  const msdosDb = await openDB("msdos", 1);
  const text = msdosDb.transaction("msdos", "readwrite");
  const store = text.objectStore("msdos");
  const request = store.put({ value: content });
  const result = await request;
  console.warn(result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {};

initdb();
