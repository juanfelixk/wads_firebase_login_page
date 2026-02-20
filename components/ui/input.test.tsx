import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Input } from "./input"

describe("Input component", () => {
  it("renders an input element", () => {
    render(<Input type="text" />)

    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
  })

  it("forwards the type prop", () => {
    render(<Input type="password" />)

    const input = screen.getByDisplayValue("") as HTMLInputElement
    expect(input.type).toBe("password")
  })

  it("forwards additional props", () => {
    render(<Input placeholder="Enter email" />)

    const input = screen.getByPlaceholderText("Enter email")
    expect(input).toBeInTheDocument()
  })

  it("forwards className", () => {
    render(<Input className="custom-class" />)

    const input = screen.getByRole("textbox")
    expect(input.className).toMatch(/custom-class/)
  })

  it("handles user input correctly", async () => {
    const user = userEvent.setup()
    render(<Input />)

    const input = screen.getByRole("textbox")

    await user.type(input, "hello")

    expect(input).toHaveValue("hello")
  })

  it("respects disabled state", () => {
    render(<Input disabled />)

    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
  })
})