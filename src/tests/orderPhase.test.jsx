import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for golden path', async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const topping1 = await screen.findByRole('checkbox', { name: /coconut/i });
  userEvent.click(topping1);

  const orderSummaryButton = screen.getByRole('button');
  userEvent.click(orderSummaryButton);

  const summaryHeading = screen.getByRole('heading', {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: /scoops/i });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', { name: /toppings/i });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText(/1 vanilla/i)).toBeInTheDocument();
  expect(screen.getByText(/2 chocolate/i)).toBeInTheDocument();
  expect(screen.getByText(/coconut/i)).toBeInTheDocument();

  const tcCheckbox = screen.getByRole('checkbox');
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole('button');
  userEvent.click(confirmOrderButton);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole('heading');
  expect(thankYouHeader).toBeInTheDocument();

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole('button');
  userEvent.click(newOrderButton);

  const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubTotal).toHaveTextContent('0.00');

  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
});
