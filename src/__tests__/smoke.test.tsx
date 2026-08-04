import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function Hello() {
  return <div>Hello, Vitest!</div>;
}

describe("Test harness", () => {
  it("renders a component and asserts with jest-dom matchers", () => {
    render(<Hello />);
    expect(screen.getByText("Hello, Vitest!")).toBeInTheDocument();
  });
});
