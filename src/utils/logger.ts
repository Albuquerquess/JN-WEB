class Logger {
  log(message: string, others?: any): void {
    if (this.shouldLog()) {
      if (!others) {
        console.log(`[${process.env.NODE_ENV}]: ${message}`);
      } else {
        console.log(`[${process.env.NODE_ENV}]: ${message}`, others);
      }
    }
  }

  shouldLog() {
    return process.env.NODE_ENV === 'development';
  }
}

export default new Logger();
