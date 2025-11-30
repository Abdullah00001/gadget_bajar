export const corsWhiteList = ['http://localhost:5173', 'http://localhost:3000'];
export const baseUrl = {
  v1: '/api/v1',
};
export const saltRound = 10;
export const accessTokenExpiresIn = '1d';
export const otpExpireAt = 4;
export const productData = [
  {
    title: 'Mechanical Keyboard',
    price: 120.0,
    quantity: 1,
    description: 'Tactile and clicky keys for a superior typing experience.',
  },
  {
    title: 'Wireless Mouse (Ergonomic)',
    price: 45.5,
    quantity: 3,
    description:
      'Contoured design to reduce wrist strain during long work sessions.',
  },
  {
    title: '4K Ultra HD Monitor 27-inch',
    price: 399.99,
    quantity: 5,
    description:
      'Stunning visuals and clarity for professional design and media consumption.',
  },
  {
    title: 'USB-C Hub (7-in-1)',
    price: 35.95,
    quantity: 2,
    description:
      'Instantly expand your connectivity with HDMI, SD, and multiple USB ports.',
  },
  {
    title: 'Noise-Cancelling Headphones',
    price: 199.0,
    quantity: 10,
    description:
      'Immersive sound quality and world-class noise cancellation for focused listening.',
  },
  {
    title: 'Portable SSD 1TB',
    price: 85.75,
    quantity: 7,
    description:
      'Blazing fast read/write speeds in a pocket-sized, durable enclosure.',
  },
  {
    title: 'Webcam 1080p HD',
    price: 55.0,
    quantity: 4,
    description:
      'Crystal-clear video and integrated microphone perfect for video calls.',
  },
  {
    title: 'Gaming Laptop (16GB RAM)',
    price: 1250.0,
    quantity: 1,
    description:
      'High-performance GPU and fast refresh rate for smooth, competitive gaming.',
  },
  {
    title: 'Smartphone Tripod',
    price: 15.2,
    quantity: 12,
    description:
      'Lightweight and adjustable tripod for stable mobile photography and video.',
  },
  {
    title: 'Smart Home Speaker',
    price: 79.99,
    quantity: 6,
    description:
      'Voice-controlled assistant with rich sound for your music and daily tasks.',
  },
  {
    title: 'LED Desk Lamp (Dimmable)',
    price: 29.5,
    quantity: 8,
    description:
      'Customizable brightness and color temperature for optimal reading or work.',
  },
  {
    title: 'Fitness Tracker Watch',
    price: 49.99,
    quantity: 15,
    description: 'Monitors heart rate, sleep, steps, and calories burned 24/7.',
  },
  {
    title: 'Electric Toothbrush',
    price: 65.0,
    quantity: 3,
    description:
      'Superior cleaning power with multiple modes for personalized oral care.',
  },
  {
    title: 'Espresso Machine',
    price: 250.0,
    quantity: 2,
    description:
      'Brew café-quality espresso shots and lattes right from your kitchen.',
  },
  {
    title: 'Reusable Water Bottle (Steel)',
    price: 19.99,
    quantity: 20,
    description:
      'Keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly design.',
  },
  {
    title: 'Yoga Mat (Non-slip)',
    price: 22.45,
    quantity: 9,
    description:
      'Thick cushioning and excellent grip for all types of workouts.',
  },
  {
    title: 'External Hard Drive 4TB',
    price: 110.0,
    quantity: 5,
    description:
      'Massive capacity for secure backup of all your photos, videos, and files.',
  },
  {
    title: 'VR Headset',
    price: 349.99,
    quantity: 1,
    description:
      'Experience virtual worlds with crystal-clear optics and fluid tracking.',
  },
  {
    title: 'Backpack (Travel)',
    price: 95.0,
    quantity: 4,
    description:
      'Durable, water-resistant design with padded compartments for laptops and gear.',
  },
  {
    title: 'E-Reader Tablet',
    price: 130.5,
    quantity: 6,
    description:
      'Glare-free screen designed to feel just like reading paper, day or night.',
  },
];

export const CHAT_HISTORY_PREFIX = 'chat:history:';
export const MAX_MESSAGES = 6;
export const HISTORY_TTL = 86400;

export enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
}

export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

export enum PaymentMethod {
  Stripe = 'stripe',
  Paypal = 'paypal',
}
