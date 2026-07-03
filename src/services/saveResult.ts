import type { AnalysisResult } from '@/types/result';

export interface SaveResultPayload {
  result: AnalysisResult;
  email?: string;
  name?: string;
}

export interface SaveResultResponse {
  success: boolean;
  message: string;
}

/**
 * TODO: Implement actual save result API call.
 * This should POST the assessment result to your backend or a third-party
 * service (e.g., Airtable, Supabase, Google Sheets via Apps Script).
 *
 * The saved data will be used by mentors before Private Class or Consultation sessions.
 */
export async function saveResult(
  payload: SaveResultPayload,
): Promise<SaveResultResponse> {
  // TODO: Replace with actual API endpoint
  console.log('[saveResult] Payload to save:', payload);

  // Simulated delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: 'Hasil berhasil disimpan.',
  };
}
