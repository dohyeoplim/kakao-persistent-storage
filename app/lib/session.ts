"use server";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface SessionUser {
    name: string;
    phoneNumber: string;
}
type SessionData = { user: SessionUser };
type VerifiedSession = SessionData & JWTPayload;

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET is not set");
const key = new TextEncoder().encode(secret);

const SESSION_MAX_AGE_S = 7 * 24 * 60 * 60;

export async function encrypt(payload: SessionData): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_S)
        .sign(key);
}

export async function decrypt(token: string): Promise<VerifiedSession> {
    const { payload } = await jwtVerify(token, key, {
        algorithms: ["HS256"],
        clockTolerance: "5s",
    });
    return payload as VerifiedSession;
}

export async function login(name: string, phoneNumber: string): Promise<void> {
    const session = await encrypt({ user: { name, phoneNumber } });
    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_MAX_AGE_S,
    });
}

export async function logout(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
    });
}

export async function getSession(): Promise<VerifiedSession | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;
    try {
        return await decrypt(token);
    } catch {
        return null;
    }
}

export async function updateSession(
    request: NextRequest
): Promise<NextResponse | undefined> {
    const token = request.cookies.get("session")?.value;
    if (!token) return;

    try {
        const payload = await decrypt(token);
        const renewed = await encrypt({ user: payload.user });

        const res = NextResponse.next();
        res.cookies.set("session", renewed, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: SESSION_MAX_AGE_S,
        });
        return res;
    } catch {
        return;
    }
}

export async function getUser(): Promise<SessionUser | null> {
    const session = await getSession();
    return session?.user ?? null;
}
