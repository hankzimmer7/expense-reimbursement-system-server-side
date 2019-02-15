import { Reimbursement } from '../models/reimbursement';
import { connectionPool } from '../util/db-connection';

// Gets all of the reimbursements
export async function findAll(): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `select r.reimbursement_id, user_author.first_name as author_first_name, user_author.last_name as author_last_name, r.amount, r.date_submitted, r.date_resolved, r.description, user_resolver.first_name as resolver_first_name, user_resolver.last_name as resolver_last_name, status.status, r_type.type as type
            from expense_reimbursement.reimbursement as r
            left join expense_reimbursement.expense_user as user_author on r.author = user_author.user_id
            left join expense_reimbursement.expense_user as user_resolver on r.resolver = user_resolver.user_id
            left join expense_reimbursement.reimbursement_status as status on r.status = status.status_id
            left join expense_reimbursement.reimbursement_type as r_type on r.type = r_type.type_id
            order by date_submitted, r.reimbursement_id;`
        );
        return result.rows.map(reimbursement => {
            return {
                reimbursementId: reimbursement.reimbursement_id,
                author: `${reimbursement.author_first_name} ${reimbursement.author_last_name}`,
                amount: reimbursement.amount,
                dateSubmitted: reimbursement.date_submitted,
                dateResolved: reimbursement.date_resolved,
                description: reimbursement.description,
                resolver: `${reimbursement.resolver_first_name} ${reimbursement.resolver_last_name}`,
                status: reimbursement.status,
                type: reimbursement.type
            };
        });
    } finally {
        client.release();
    }
}

// Gets all of the reimbursements with a given status and sorts by date
export async function findByStatus(statusId: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `select r.reimbursement_id, user_author.first_name as author_first_name, user_author.last_name as author_last_name, r.amount, r.date_submitted, r.date_resolved, r.description, user_resolver.first_name as resolver_first_name, user_resolver.last_name as resolver_last_name, status.status, r_type.type as type
            from expense_reimbursement.reimbursement as r
            left join expense_reimbursement.expense_user as user_author on r.author = user_author.user_id
            left join expense_reimbursement.expense_user as user_resolver on r.resolver = user_resolver.user_id
            left join expense_reimbursement.reimbursement_status as status on r.status = status.status_id
            left join expense_reimbursement.reimbursement_type as r_type on r.type = r_type.type_id
            where r.status = $1
            order by date_submitted, r.reimbursement_id`,
            [statusId]
        );
        return result.rows.map(reimbursement => {
            return {
                reimbursementId: reimbursement.reimbursement_id,
                author: `${reimbursement.author_first_name} ${reimbursement.author_last_name}`,
                amount: reimbursement.amount,
                dateSubmitted: reimbursement.date_submitted,
                dateResolved: reimbursement.date_resolved,
                description: reimbursement.description,
                resolver: `${reimbursement.resolver_first_name} ${reimbursement.resolver_last_name}`,
                status: reimbursement.status,
                type: reimbursement.type
            };
        });
    } finally {
        client.release();
    }
}

// Gets all of the reimbursements for a given user and sorts by date
export async function findByUser(userId: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `select r.reimbursement_id, user_author.first_name as author_first_name, user_author.last_name as author_last_name, r.amount, r.date_submitted, r.date_resolved, r.description, user_resolver.first_name as resolver_first_name, user_resolver.last_name as resolver_last_name, status.status, r_type.type as type
            from expense_reimbursement.reimbursement as r
            left join expense_reimbursement.expense_user as user_author on r.author = user_author.user_id
            left join expense_reimbursement.expense_user as user_resolver on r.resolver = user_resolver.user_id
            left join expense_reimbursement.reimbursement_status as status on r.status = status.status_id
            left join expense_reimbursement.reimbursement_type as r_type on r.type = r_type.type_id
            where r.author = $1
            order by date_submitted, r.reimbursement_id`,
            [userId]
        );
        return result.rows.map(reimbursement => {
            return {
                reimbursementId: reimbursement.reimbursement_id,
                author: `${reimbursement.author_first_name} ${reimbursement.author_last_name}`,
                amount: reimbursement.amount,
                dateSubmitted: reimbursement.date_submitted,
                dateResolved: reimbursement.date_resolved,
                description: reimbursement.description,
                resolver: `${reimbursement.resolver_first_name} ${reimbursement.resolver_last_name}`,
                status: reimbursement.status,
                type: reimbursement.type
            };
        });
    } finally {
        client.release();
    }
}

// Get a reimbursement by its id
export async function findById(id: number): Promise<Reimbursement> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `select r.reimbursement_id, user_author.first_name as author_first_name, user_author.last_name as author_last_name, r.amount, r.date_submitted, r.date_resolved, r.description, user_resolver.first_name as resolver_first_name, user_resolver.last_name as resolver_last_name, status.status, r_type.type as type
            from expense_reimbursement.reimbursement as r
            left join expense_reimbursement.expense_user as user_author on r.author = user_author.user_id
            left join expense_reimbursement.expense_user as user_resolver on r.resolver = user_resolver.user_id
            left join expense_reimbursement.reimbursement_status as status on r.status = status.status_id
            left join expense_reimbursement.reimbursement_type as r_type on r.type = r_type.type_id
            where r.reimbursement_id = $1;`,
            [id]
        );
        const reimbursement = result.rows[0];
        if (reimbursement) {
            return {
                reimbursementId: reimbursement.reimbursement_id,
                author: `${reimbursement.author_first_name} ${reimbursement.author_last_name}`,
                amount: reimbursement.amount,
                dateSubmitted: reimbursement.date_submitted,
                dateResolved: reimbursement.date_resolved,
                description: reimbursement.description,
                resolver: `${reimbursement.resolver_first_name} ${reimbursement.resolver_last_name}`,
                status: reimbursement.status,
                type: reimbursement.type
            };
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}

// Get a reimbursement by its id and don't join the foreign keys. This is used for updating a reimbursement
export async function findByIdNoJoin(id: number): Promise<Reimbursement> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `select * from expense_reimbursement.reimbursement where reimbursement_id = $1;`,
            [id]
        );
        const reimbursement = result.rows[0];
        if (reimbursement) {
            return {
                reimbursementId: reimbursement.reimbursement_id,
                author: reimbursement.author,
                amount: reimbursement.amount,
                dateSubmitted: reimbursement.date_submitted,
                dateResolved: reimbursement.date_resolved,
                description: reimbursement.description,
                resolver: reimbursement.resolver,
                status: reimbursement.status,
                type: reimbursement.type
            };
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}

// Add a reimbursement to the database
export async function save(reimbursement: Reimbursement): Promise<Reimbursement> {
    const client = await connectionPool.connect();
    try {
        reimbursement.dateSubmitted = new Date();
        reimbursement.dateResolved = new Date(1900, 0, 1);
        const result = await client.query(
            `insert into expense_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
        values  ($1, $2, $3, $4, $5, $6, $7, $8)
        returning reimbursement_id`,
            [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved, reimbursement.description, reimbursement.resolver, 1, reimbursement.type]
        );
        if (result.rows[0]) {
            const id = result.rows[0].reimbursement_id;
            return {
                ...reimbursement,
                reimbursementId: id
            };
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}

// Update a reimbursement
export async function update(reimbursement: Reimbursement) {
    const client = await connectionPool.connect();
    try {
        // Get the reimbursement's current info before updating
        const reimbursementToUpdate = await findByIdNoJoin(reimbursement.reimbursementId);
        // If a field was not provided to update, keep the old info
        if (!reimbursement.author) {reimbursement.author = reimbursementToUpdate.author; }
        if (!reimbursement.amount || (+reimbursement.amount <= 0) || (isNaN(reimbursement.amount))) {reimbursement.amount = reimbursementToUpdate.amount; }
        if (!reimbursement.dateResolved) {reimbursement.dateResolved = reimbursementToUpdate.dateResolved; }
        if (!reimbursement.description) {reimbursement.description = reimbursementToUpdate.description; }
        if (!reimbursement.status || (+reimbursement.status === 0)) {reimbursement.status = reimbursementToUpdate.status; }
        if (!reimbursement.type || (+reimbursement.type === 0)) {reimbursement.type = reimbursementToUpdate.type; }
        // If the status is being updated to approved or denied, set the date resolved to the current date. If it is being updated to pending, update the date resolved to Jan 1, 1900.
        const currentDate = new Date();
        if (+reimbursement.status !== 1) {
            reimbursement.dateResolved = currentDate;
        } else {
            reimbursement.dateResolved = new Date(1900, 0, 1);
        }
        const result = await client.query(
            `update expense_reimbursement.reimbursement set author = $2, amount = $3, date_resolved = $4, description = $5, resolver = $6, status = $7, type = $8 where reimbursement_id = $1
            returning *`,
            [reimbursement.reimbursementId, reimbursement.author, reimbursement.amount, reimbursement.dateResolved, reimbursement.description, reimbursement.resolver, reimbursement.status, reimbursement.type]
        );
        if (result.rows[0]) {
            const reimbursement = result.rows[0];
            return ({
                reimbursementId: reimbursement.reimbursement_id,
                author: reimbursement.author,
                amount: reimbursement.amount,
                dateSubmitted: reimbursement.date_submitted,
                dateResolved: reimbursement.date_resolved,
                description: reimbursement.description,
                resolver: reimbursement.resolver,
                status: reimbursement.status,
                type: reimbursement.type
            });
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}
