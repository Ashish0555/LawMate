export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

export const DEMO_USER_STORAGE_KEY = "legalconsult.demo-user";

export type DemoUser = {
  id: string;
  email: string;
  role: string;
};

type DemoClientResponse = {
  token: string;
  user: DemoUser;
};

export async function getOrCreateDemoClient(): Promise<DemoUser> {
  if (typeof window !== "undefined") {
    const cachedUser = window.localStorage.getItem(DEMO_USER_STORAGE_KEY);

    if (cachedUser) {
      return JSON.parse(cachedUser) as DemoUser;
    }
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/demo-client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to initialize demo client");
  }

  const data = (await response.json()) as DemoClientResponse;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(data.user));
    window.localStorage.setItem("legalconsult.demo-token", data.token);
  }

  return data.user;
}
