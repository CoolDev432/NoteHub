import { Client, Databases, ID, Storage } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://syd.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const database = new Databases(client);
const storage = new Storage(client);

export { database, storage };