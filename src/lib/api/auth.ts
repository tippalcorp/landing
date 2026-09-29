import { apiClient } from "./client";

export interface AuthUser {
  id: string;
  tippalId: string;
  email: string;
  firstName: string;
  lastName: string;
  hospitalityRole: string;
  digitalRole: string;
  communityRole: string;
  flexRole: string;
}

export interface OtpSendResponse {
  message: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  user: AuthUser;
}

export async function sendLoginCode(email: string): Promise<OtpSendResponse> {
  const { data } = await apiClient.post<OtpSendResponse>("/auth/otp-send", {
    email,
  });

  return data;
}

export async function verifyLoginCode(
  email: string,
  code: string,
): Promise<VerifyOtpResponse> {
  const { data } = await apiClient.post<VerifyOtpResponse>(
    "/auth/verify-otp",
    { email, code },
  );

  return data;
}
