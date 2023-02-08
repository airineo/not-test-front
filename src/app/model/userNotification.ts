export class userNotification {
    private id : string;
    private name : string;
    private email : number;
    private creationDate : Date;
    private phoneNumber: number
    private subscribed : [];
    private channels : [];

    constructor(id, name, email, creationDate, phoneNumber, subscribed, channels){
        this.id = id;
        this.name = name;
        this.email = email;
        this.creationDate = creationDate;
        this.phoneNumber = phoneNumber;
        this.subscribed = subscribed;
        this.channels = channels;
    }
}