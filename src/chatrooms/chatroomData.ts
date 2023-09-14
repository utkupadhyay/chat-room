/**
 * Dummy data file for unit tests
 */
interface Room {
  id: string;
  title: string;
}

const chatRooms: Room[] = [
  { id: 'politics', title: 'Politics' },
  { id: 'general', title: 'General' },
  { id: 'technology', title: 'Technology' },
];

export { chatRooms };
