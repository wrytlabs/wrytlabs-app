export type RequestQuery<ApiResult> = {
	jsonrpc: `${number}.${number}`;
	id: number;
	result?: ApiResult;
	error?: {
		code: number;
		message: string;
	};
	testnet: boolean;
	usDiff: number;
	usIn: number;
	usOut: number;
};

export type WebSocketClientOptions = {
	baseUrl: string;
	clientId: string;
	clientSecret: string;
};

export class WebSocketClient {
	private options: WebSocketClientOptions;
	private socket: WebSocket | undefined;
	private requests: Map<number, Function>;
	private id: number;

	constructor(options: WebSocketClientOptions) {
		this.socket = undefined;
		this.options = options;
		this.requests = new Map();
		this.id = 0;
		this.connect();
	}

	private connect() {
		// create
		this.socket = new WebSocket(this.options.baseUrl);

		// reconnect after 5 seconds
		this.socket.onclose = () => {
			setTimeout(() => this.connect(), 5000);
		};

		// handle message and callback
		this.socket.onmessage = (event) => {
			const message = JSON.parse(event?.data);
			const { id } = message;

			// callback available?
			if (this.requests.has(id)) {
				const callback = this.requests.get(id);
				if (typeof callback === 'function') callback(message);
			}
		};

		// auto auth
		this.socket.onopen = (event) => {
			this.send(
				'/public/auth',
				{
					client_id: this.options.clientId,
					client_secret: this.options.clientSecret,
					grant_type: 'client_credentials',
				},
				(data) => console.log(data?.error ?? data?.result)
			);
		};
	}

	send<ApiResult>(
		method: string,
		params: Record<string, any>,
		callback?: (data: RequestQuery<ApiResult>) => any
	): Promise<RequestQuery<ApiResult>> {
		return new Promise((resolve, reject) => {
			const requestId = this.id;
			this.id += 1;

			if (this.socket?.readyState === WebSocket.OPEN) {
				this.requests.set(requestId, (data: RequestQuery<ApiResult>) => {
					if (callback != undefined) resolve(callback(data));
					else resolve(data);
				});
				this.socket.send(
					JSON.stringify({
						jsonrpc: '2.0',
						id: requestId,
						method,
						params,
					})
				);
				setTimeout(
					() =>
						reject({
							jsonrpc: '2.0',
							id: requestId,
							error: {
								code: this.socket?.readyState || 0,
								message: 'WebSocket timeout',
							},
							testnet: false,
							usDiff: 0,
							usIn: 0,
							usOut: 0,
						}),
					10000
				);
			} else {
				reject({
					jsonrpc: '2.0',
					id: requestId,
					error: {
						code: this.socket?.readyState || 0,
						message: 'WebSocket not open',
					},
					testnet: false,
					usDiff: 0,
					usIn: 0,
					usOut: 0,
				});
			}
		});
	}

	close() {
		this.socket?.close();
	}
}

export function createWebSocketClient(options: WebSocketClientOptions): WebSocketClient {
	return new WebSocketClient(options);
}
