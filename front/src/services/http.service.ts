import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

export class HTTPService {
  private getFullUrl(url: string): string {
    return `${VITE_BACKEND_URL}/${url}`;
  }

  protected async get(url: string) {
    const result = await axios.get(this.getFullUrl(url));

    return result.data;
  }

  protected async post<T>(url: string, body: T) {
    const result = await axios.post(this.getFullUrl(url), body);

    return result.data;
  }
}
