export class ErrorMessage {
    public StatusCode?: number;
    public MessageDetail?: string;
    public Message?: any;
    public RedirectUrl?: string;

    constructor(status?: number, stack?: string, message?: any, redirect?: string) {
        this.StatusCode = status;
        this.MessageDetail = stack;
        this.Message = message;
        this.RedirectUrl = redirect;
    }
}