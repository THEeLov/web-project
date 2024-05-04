import axios from 'axios';

const seedDatabase = async () => {
  try {
    const response = await axios.post('https://inqool-interview-api.vercel.app/api/seed');
    console.log('Database seeding successful:', response.data);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();