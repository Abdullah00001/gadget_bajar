import groq from '@/singletons/grok.singleton';
import {
  CHAT_HISTORY_PREFIX,
  HISTORY_TTL,
  MAX_MESSAGES,
  productData,
} from '@/const';
import redisClient from '@/configs/redis.config';
import logger from '@/configs/logger.configs';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

const ChatBotServices = {
  processChat: async ({
    message,
    userId,
  }: {
    message: string;
    userId: string;
  }): Promise<string> => {
    try {
      console.log(message, userId);
      const history = await ChatBotServices.getHistory(userId);
      console.log(history);
      const userMessage: ChatMessage = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      const messages = [
        {
          role: 'system' as const,
          content: ChatBotServices.buildSystemPrompt(),
        },
        ...history.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        {
          role: 'user' as const,
          content: message,
        },
      ];
      const completion = await groq.chat.completions.create({
        messages,
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 500,
      });
      const reply =
        completion.choices[0]?.message?.content ||
        'Sorry, I could not process that.';
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: reply,
        timestamp: new Date().toISOString(),
      };
      await ChatBotServices.saveHistory(userId, [
        ...history,
        userMessage,
        assistantMessage,
      ]);

      return reply;
    } catch (error) {
      logger.error(error);
      if (error instanceof Error) throw error;
      throw new Error('Unknown error occurred in chat service');
    }
  },
  async getHistory(userId: string): Promise<ChatMessage[]> {
    try {
      const key = `${CHAT_HISTORY_PREFIX}${userId}`;
      const data = await redisClient.get(key);

      if (!data) return [];

      const messages: ChatMessage[] = JSON.parse(data);
      return messages;
    } catch (error) {
      console.error('Error getting chat history from Redis:', error);
      return [];
    }
  },
  async saveHistory(userId: string, messages: ChatMessage[]): Promise<void> {
    try {
      const key = `${CHAT_HISTORY_PREFIX}${userId}`;

      const recentMessages = messages.slice(-MAX_MESSAGES);

      await redisClient.setex(key, HISTORY_TTL, JSON.stringify(recentMessages));
    } catch (error) {
      console.error('Error saving chat history to Redis:', error);
      throw new Error('Failed to save chat history');
    }
  },
  async hasHistory(userId: string): Promise<boolean> {
    try {
      const key = `${CHAT_HISTORY_PREFIX}${userId}`;
      const exists = await redisClient.exists(key);
      return exists === 1;
    } catch (error) {
      console.error('Error checking chat history:', error);
      return false;
    }
  },
  buildSystemPrompt(): string {
    const productList = productData
      .map(
        (p, idx) =>
          `${idx + 1}. ${p.title} - $${p.price.toFixed(2)} (${p.quantity} in stock)\n   ${p.description}`
      )
      .join('\n\n');

    return `You are a helpful shopping assistant for an e-commerce store.
Answer questions about products briefly and accurately.

Available Products:
${productList}

Guidelines:
- Be concise and friendly
- Recommend products based on user needs
- Mention price and stock availability when relevant
- If asked about products not in the list, politely say they're not currently available
- For comparison questions, highlight key differences
- Keep responses under 3-4 sentences when possible`;
  },
};

export default ChatBotServices;
