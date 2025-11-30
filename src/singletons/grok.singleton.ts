import { env } from '@/env';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export default groq;
