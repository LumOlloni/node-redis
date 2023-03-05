interface  Redis  {
  connect(): void

  set(key: string, value: string): void

  get(key: string): Promise<any>;

  disconnect(): void;

  getClient(): any;
}

export {Redis}