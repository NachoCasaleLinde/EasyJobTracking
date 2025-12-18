import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { IJobData } from './Interfaces/globalInterfaces';

setGlobalOptions({ maxInstances: 10 });

//* firebase deploy --only functions

/**
 * GET /jobs?userId=123
 * Returns all job entries for the given user as IJobData[].
 */
export const getJobs = onRequest(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ error: 'Missing userId parameter' });
      return;
    }

    const doc = await getFirestore().collection('jobs').doc(userId).get();

    if (!doc.exists) {
      res.status(200).json({
        message: 'Jobs retrieved successfully',
        data: [] as IJobData[],
      });
      return;
    }

    const data = doc.data();
    const jobsMap = (data?.jobs ?? {}) as Record<string, any>;

    const jobs: IJobData[] = Object.entries(jobsMap).map(([id, job]) => ({
      id,
      jobName: String(job.jobName ?? ''),
      company: String(job.company ?? ''),
      status: Array.isArray(job.status) ? job.status : [],
      platform: String(job.platform ?? ''),
      notes: String(job.notes ?? ''),
      rejectReason: job.rejectReason ? String(job.rejectReason) : undefined,
    }));

    res.status(200).json({
      message: 'Jobs retrieved successfully',
      data: jobs,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /job
 * Updates an existing job entry for a user.
 *
 * Body example:
 * {
 *   "userId": "123",
 *   "jobId": "job-abc",
 *   "job": IJobData
 * }
 */
export const updateJob = onRequest(async (req, res) => {
  try {
    if (req.method !== 'PUT') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { userId, jobId, job } = req.body as {
      userId?: string;
      jobId?: string;
      job?: Partial<IJobData>;
    };

    if (!userId || !jobId || !job) {
      res.status(400).json({ error: 'Missing userId, jobId or job data' });
      return;
    }

    const docRef = getFirestore().collection('jobs').doc(userId);

    await docRef.set(
      {
        [`jobs.${jobId}`]: {
          ...job,
          updatedAt: Date.now(),
        },
        updatedAt: Date.now(),
      },
      { merge: true },
    );

    res.status(200).json({
      message: 'Job updated successfully',
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /job
 *
 * Body example:
 * {
 *   "userId": "123",
 *   "jobId": "job-abc"
 * }
 */
export const deleteJob = onRequest(async (req, res) => {
  try {
    if (req.method !== 'DELETE') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { userId, jobId } = req.body as {
      userId?: string;
      jobId?: string;
    };

    if (!userId || !jobId) {
      res.status(400).json({ error: 'Missing userId or jobId' });
      return;
    }

    await getFirestore()
      .collection('jobs')
      .doc(userId)
      .update({
        [`jobs.${jobId}`]: FieldValue.delete(),
        updatedAt: Date.now(),
      });

    res.status(200).json({
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
