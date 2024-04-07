import { TypewriterText } from "./TypewriterText"; // Assuming TypewriterText is in the same directory

export class TypewriterManager {
  private queue: TypewriterText[];

  constructor() {
    this.queue = [];
  }

  public addText(typewriterText: TypewriterText): void {
    typewriterText.setOnComplete(() => this.startNext());
    this.queue.push(typewriterText);
  }

  public start() {
    this.startNext();
  }

  private startNext(): void {
    if (this.queue.length > 0) {
      const currentTypewriterText = this.queue.shift(); // Remove and get the first element from the queue
      if (currentTypewriterText) {
        currentTypewriterText.start();
      }
    }
  }
}
