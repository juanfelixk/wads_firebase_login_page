/**
 * @jest-environment node
 */

import { POST } from "./route"

describe("POST /api/logout", () => {
  const originalEnv = process.env.NODE_ENV

  afterEach(() => {
    // restore original environment after each test
    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalEnv,
      configurable: true,
    })
  })

  it("returns status 200 and logout message", async () => {
    const response = await POST()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ message: "Logged out" })
  })

  it("clears the session cookie with correct attributes", async () => {
    const response = await POST()
    const setCookie = response.headers.get("set-cookie")

    expect(setCookie).toBeTruthy()
    expect(setCookie).toContain("session=")
    expect(setCookie).toContain("HttpOnly")
    expect(setCookie).toContain("Path=/login")
    expect(setCookie).toContain("Expires=")
  })

  it("sets Secure flag in production", async () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
    })

    const response = await POST()
    const setCookie = response.headers.get("set-cookie")

    expect(setCookie).toContain("Secure")
  })

  it("does not set Secure flag in development", async () => {
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "development",
      configurable: true,
    })

    const response = await POST()
    const setCookie = response.headers.get("set-cookie")

    expect(setCookie).not.toContain("Secure")
  })
})