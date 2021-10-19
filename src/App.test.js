import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

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

test("disabled button has gray background", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  expect(button).toHaveStyle({ backgroundColor: "gray" });
});

describe("spaces added before camel-case capitals", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("works for one capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("works for multiple capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
