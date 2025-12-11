import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import { getFirestore } from 'firebase-admin/firestore';

setGlobalOptions({ maxInstances: 10 });

//* firebase deploy --only functions

/**
 * GET /jobs?userId=123
 * Returns all job entries for the given user.
 */
export const getJobs = onRequest(async (req, res) => {
  try {
    // Only allow GET
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const userId = req.query.userId as string;

    // Validate required param
    if (!userId) {
      res.status(400).json({ error: 'Missing userId parameter' });
      return;
    }

    // The document for that user
    const userDoc = await getFirestore().collection('jobs').doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).json({ error: 'No job data found for this user' });
      return;
    }

    // Data stored inside the document
    const jobsData = userDoc.data();

    res.status(200).json({
      message: 'Jobs retrieved successfully',
      data: jobsData,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
