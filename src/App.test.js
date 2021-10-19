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
test("button initially enabled", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to green" });
  expect(button).toBeEnabled();
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  expect(checkbox).not.toBeChecked();
});

test("checkbox disables and reenable button", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});
