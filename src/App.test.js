import { render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct initial colour", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to green" });
  expect(button).toHaveStyle({ backgroundColor: "red" });
});
test("button turns green when cliclekd", () => {});
test("button has correct initial colour", () => {});
