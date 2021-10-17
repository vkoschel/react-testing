import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button has correct initial colour", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to green" });
  expect(button).toHaveStyle({ backgroundColor: "red" });
  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: "green" });
  expect(button.textContent).toBe("Change to red");
});
test("button turns green when clicled", () => {
  render(<App />);
});
test("button has correct initial colour", () => {});
