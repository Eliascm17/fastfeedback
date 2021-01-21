import { auth } from '@/lib/firebase-admin';
import { getUserFeedback } from '@/lib/db-admin';
import { logger, prepObjectKeys } from '@/utils/logger';

export default async (req, res) => {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token);
        const { feedback } = await getUserFeedback(uid);

        res.status(200).json({ feedback });
    } catch (error) {
        logger.info(
            {
                request: {
                    headers: headers,
                    url: req.url,
                    method: req.method
                },
                response: {
                    statusCode: res.statusCode
                }
            },
            error.message
        );
        res.status(500).json({ error });
    }
};
