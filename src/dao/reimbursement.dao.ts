import { Reimbursement } from '../models/reimbursement';
import { connectionPool } from '../util/db-connection';

export async function findAll(): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            'select * from expense_reimbursement.reimbursement'
        );
        return result.rows.map(reimbursement => {
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
        });
    } finally {
        client.release();
    }
}

// export async function findById(id: number): Promise<User> {
//     const client = await connectionPool.connect();
//     try {
//         const result = await client.query(
//             'select * from expense_reimbursement.expense_user where user_id = $1',
//             [id]
//         );
//         const user = result.rows[0];
//         if (user) {
//             return {
//                 userId: user.user_id,
//                 username: user.username,
//                 password: '',
//                 firstName: user.first_name,
//                 lastName: user.last_name,
//                 email: user.email,
//                 role: user.role
//             };
//         } else {
//             return undefined;
//         }
//     } finally {
//         client.release();
//     }
// }

// export async function save(user: User): Promise<User> {
//     const client = await connectionPool.connect();
//     try {
//         const result = await client.query(
//             `insert into users (username, password, firstName, lastName, email, role)
//         values  ($1, $2, $3, $4, $5, $6)
//         returning user_id`,
//             [user.username, user.password, user.firstName, user.lastName, user.email, user.role]
//         );
//         if (result.rows[0]) {
//             const id = result.rows[0].user_id;
//             return {
//                 ...user,
//                 userId: id
//             };
//         } else {
//             return undefined;
//         }

//     } finally {
//         client.release();
//     }
// }

