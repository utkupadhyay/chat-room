import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAEe6f5kb6MX0FxSBy1LtYxsnPF6Ngcvxk',
  authDomain: 'chat-app-a1031.firebaseapp.com',
  projectId: 'chat-app-a1031',
  storageBucket: 'chat-app-a1031.appspot.com',
  messagingSenderId: '260231909953',
  appId: '1:260231909953:web:0ce75fde9c0f15cefaecc0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
interface UserResult {
  uid: string;
  displayName: string | null;
}

async function loginWithGoogle(): Promise<UserResult | null> {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await setPersistence(auth, browserSessionPersistence);
    const { user } = await signInWithPopup(auth, provider);

    if (!user) {
      throw new Error('No user data available');
    }

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message !== 'auth/cancelled-popup-request') {
        console.error(error);
      }
    }

    return null;
  }
}

const sendMessage = async (
  roomId: string,
  user: { uid: string; displayName: string },
  text: string
): Promise<void> => {
  try {
    await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
};
interface Message {
  id: string;
}
const getMessages = (
  roomId: string,
  callback: (messages: Message[]) => void
) => {
  return onSnapshot(
    query(
      collection(db, 'chat-rooms', roomId, 'messages'),
      orderBy('timestamp', 'asc')
    ),
    (querySnapshot) => {
      const messages: Message[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
};

const getChatRooms = async () => {
  try {
    const chatRoomsSnapshot = await getDocs(collection(db, 'chat-room-data'));
    const chatRooms = chatRoomsSnapshot.docs.map((room) => ({
      ...room.data(),
    }));
    return chatRooms;
  } catch (e) {
    console.error('Failed to fetch data');
  }
};

const getAllFileUrls = async (storageName: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, storageName);

  try {
    const { items } = await listAll(storageRef);
    const urls = await Promise.all(
      items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      })
    );
    return urls;
  } catch (error) {
    console.error(`Failed to get file URLs. ${error}`);
  }
};

export {
  loginWithGoogle,
  sendMessage,
  getMessages,
  getChatRooms,
  getAllFileUrls,
};
