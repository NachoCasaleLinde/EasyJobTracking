export interface IJobData {
  id: string;
  jobName: string;
  company: string;
  status: Array<IStatusData>;
  platform: string;
  notes: string;
  rejectReason?: string;
}

export interface IStatusData {
  phase: string;
  date: string;
}
