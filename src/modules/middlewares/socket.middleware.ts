import { Socket } from 'socket.io';
import JwtUtils from '@/utils/jwt.utils';

const { verifyAccessToken } = JwtUtils;

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    // Get token from query params or handshake auth
    const token = socket.handshake.auth.token || socket.handshake.query.token;

    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    // Verify JWT token
    const decoded = verifyAccessToken(token);
    // Attach user data to socket
    socket.data.userId = decoded.sub;

    next();
  } catch (error) {
    next(new Error('Authentication error: Invalid token'));
  }
};
