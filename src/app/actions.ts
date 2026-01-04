"use server";

import { suggestAdminContent, type AdminContentSuggestionInput } from '@/ai/flows/admin-content-suggestion';

export async function getAdminContentSuggestion(input: AdminContentSuggestionInput) {
  try {
    const result = await suggestAdminContent(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    // In a real app, you'd want more specific error handling and logging.
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to get content suggestion: ${errorMessage}` };
  }
}
