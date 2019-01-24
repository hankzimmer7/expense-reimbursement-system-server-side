import { User } from './models/user';

// Create user data
const hank = new User(1, 'hankzimmer7', 'password', 'Hank', 'Zimmer', 'hankzimmer7@gmail.com', 'associate');
const dana = new User(2, 'dana555', 'password', 'Dana', 'Peters', 'dana@trulia.com', 'associate');

// Export users
export let users: User[] = [hank, dana];