export class Reimbursement {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number;

    constructor(reimbursementId = 0, author = 0, amount = 0, dateSubmitted = 0, dateResolved = 0, description = '', resolver = 0, status = 0, type = 0) {
        this.reimbursementId = reimbursementId;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.resolver = resolver;
        this.status = status;
        this.type = type;
    }
}