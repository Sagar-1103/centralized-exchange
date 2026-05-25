interface WebSocketTokenResponse {
    symbol: string;
    price: string;
}

interface RateLimit {
    rateLimitType: string;
    interval: string;
    intervalNum: number;
    limit: number;
    count: number;
}

export interface WebSocketResponse {
  id: string;
  status: number;
  result: WebSocketTokenResponse;
  rateLimits: RateLimit[];
  createdAt: number;
}