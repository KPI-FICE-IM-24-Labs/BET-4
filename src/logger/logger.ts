import { LogMessage } from '../types';

export class logger {
  public static error(message: string, options?: Record<string, any>) {
    console.error(`ERROR ${this.createMessage(message, options)}`);
  }

  public static info(message: string, options?: Record<string, any>) {
    console.log(`INFO ${this.createMessage(message, options)}`);
  }

  private static createMessage(
    message: string,
    options?: Record<string, any>
  ): string {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    const logMessage: LogMessage = { timestamp, message, options };
    return JSON.stringify(logMessage);
  }
}
