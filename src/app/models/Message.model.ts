export enum MessageType {
  Error,
  Warning,
  Success
}

export class Message {
  constructor(public message: string, public type: MessageType = MessageType.Success) { }

  public get messageTypeString(): string {
    switch (this.type) {
      case MessageType.Error:
        return 'danger';
      case MessageType.Warning:
        return 'warning';
      case MessageType.Success:
        return 'success';
      default:
        return 'unknown';
    }
  }
}
