// src/configs/socket.config.ts

import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import redisClient from '@/configs/redis.config';
import { socketCorsConfiguration } from '@/configs/cors.configs';

let io: Server | null = null;

export function initializeSocket(server: HTTPServer): Server {
  io = new Server(server, {
    cors: socketCorsConfiguration,
    transports: ['websocket', 'polling'],
  });

  // Set up Redis adapter for multi-server support
  const subClient = redisClient.duplicate();

  io.adapter(createAdapter(redisClient, subClient));

  // Connection handler
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Join user-specific room
    socket.on('join:user', (userId: string) => {
      socket.join(`user:${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Join order-specific room
    socket.on('join:order', (orderId: string) => {
      socket.join(`order:${orderId}`);
      console.log(`Client joined order room: ${orderId}`);
    });

    // Leave order room
    socket.on('leave:order', (orderId: string) => {
      socket.leave(`order:${orderId}`);
      console.log(`Client left order room: ${orderId}`);
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Error handler
    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  });

  console.log('Socket.IO initialized with Redis adapter');

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.IO not initialized. Call initializeSocket first.');
  }
  return io;
}

export async function closeSocket(): Promise<void> {
  if (io) {
    await new Promise<void>((resolve) => {
      io!.close(() => {
        console.log('✅ Socket.IO closed');
        resolve();
      });
    });
    io = null;
  }
}
