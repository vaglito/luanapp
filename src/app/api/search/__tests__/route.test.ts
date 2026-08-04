import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

import { GET } from "@/app/api/search/route";

describe("Search API route (#65)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends Content-Type: application/json header', async () => {
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ results: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const request = new Request("http://localhost/api/search?q=laptop");
    await GET(request);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const fetchCall = mockFetch.mock.calls[0];
    const fetchOptions = fetchCall[1];
    expect(fetchOptions.headers["Content-Type"]).toBe("application/json");
  });

  it("does NOT send the typo 'applications/json'", async () => {
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ results: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const request = new Request("http://localhost/api/search?q=laptop");
    await GET(request);

    const fetchOptions = mockFetch.mock.calls[0][1];
    expect(fetchOptions.headers["Content-Type"]).not.toBe("applications/json");
  });

  it("returns empty results when no query is provided", async () => {
    const request = new Request("http://localhost/api/search");
    const response = await GET(request);

    expect(mockFetch).not.toHaveBeenCalled();
    const body = await response.json();
    expect(body).toEqual({ results: [] });
  });
});
