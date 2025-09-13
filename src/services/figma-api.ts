
import fetch from "node-fetch";
import { FigmaAPIError } from "../utils/errors";

export class FigmaAPI {
  private baseUrl = "https://api.figma.com/v1";
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "X-Figma-Token": this.token,
      },
    });

    if (!response.ok) {
      throw new FigmaAPIError(
        `Figma API request failed: ${response.statusText}`,
        response.status,
        await response.json()
      );
    }

    return response.json() as Promise<T>;
  }

  public async getDocument(fileKey: string) {
    return this.request(`/files/${fileKey}`);
  }
}
