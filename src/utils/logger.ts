class Logger {
  log(message: string, others?: unknown): void {
    if (this.shouldLog()) {
      if (!others) {
        console.log(`[${process.env.NODE_ENV}]: ${message}`);
      } else {
        console.log(`[${process.env.NODE_ENV}]: ${message}`, others);
      }
    }
  }

  shouldLog() {
    return (process.env.NODE_ENV as string) === 'develop';
  }
}

export default new Logger();
