import { User } from '../models/user';
import { connectionPool } from '../util/db-connection';

// Find all users, with the password field left blank
export async function findAll(): Promise<User[]> {
    console.log('Getting all users from db');
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `select user_id, username, password, first_name, last_name, email, expense_reimbursement.expense_role.expense_role from expense_reimbursement.expense_user
            join expense_reimbursement.expense_role on expense_reimbursement.expense_user.expense_role = expense_reimbursement.expense_role.role_id;`
        );
        return result.rows.map(user => {
            return {
                userId: user.user_id,
                username: user.username,
                password: '',
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.expense_role
            };
        });
    } finally {
        client.release();
    }
}

// Used for password verification when logging in
export async function findAllWithPasswords(): Promise<User[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `select user_id, username, password, first_name, last_name, email, expense_reimbursement.expense_role.expense_role from expense_reimbursement.expense_user
            join expense_reimbursement.expense_role on expense_reimbursement.expense_user.expense_role = expense_reimbursement.expense_role.role_id;`
        );
        return result.rows.map(user => {
            return {
                userId: user.user_id,
                username: user.username,
                password: user.password,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.expense_role
            };
        });
    } finally {
        client.release();
    }
}

// Find a user based on the provided id
export async function findById(id: number): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `select user_id, username, password, first_name, last_name, email, expense_reimbursement.expense_role.expense_role from expense_reimbursement.expense_user
            join expense_reimbursement.expense_role on expense_reimbursement.expense_user.expense_role = expense_reimbursement.expense_role.role_id where user_id = $1;`,
            [id]
        );
        const user = result.rows[0];
        if (user) {
            return {
                userId: user.user_id,
                username: user.username,
                password: '',
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.expense_role
            };
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}

// Add a user to the database
export async function save(user: User): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role)
        values  ($1, $2, $3, $4, $5, $6)
        returning user_id`,
            [user.username, user.password, user.firstName, user.lastName, user.email, user.role]
        );
        if (result.rows[0]) {
            const id = result.rows[0].user_id;
            return {
                ...user,
                userId: id
            };
        } else {
            return undefined;
        }

    } finally {
        client.release();
    }
}

// Update a user
export async function update(user: User) {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `update expense_reimbursement.expense_user set username = $2, password = $3, first_name = $4, last_name = $5, email = $6, expense_role = $7 where user_id = $1
            returning *`,
            [user.userId, user.username, user.password, user.firstName, user.lastName, user.email, user.role]
        );
        if (result.rows[0]) {
            const user = result.rows[0];
            return ({
                userId: user.user_id,
                username: user.username,
                password: '',
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.expense_role
            });
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}
