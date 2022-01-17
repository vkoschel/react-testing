import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal', async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubTotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla scoop',
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubTotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate scoop',
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubTotal).toHaveTextContent('6.00');
});

test('update toppings subtotal', async () => {
  render(<Options optionType="toppings" />);

  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  const coconutCheckbox = await screen.findByRole('checkbox', {
    name: 'coconut topping',
  });
  userEvent.click(coconutCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  const chipsCheckbox = await screen.findByRole('checkbox', {
    name: 'chocolate chips topping',
  });
  userEvent.click(chipsCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');
  userEvent.click(chipsCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total scoop first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla scoop',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const coconutCheckbox = await screen.findByRole('checkbox', {
      name: 'coconut topping',
    });
    userEvent.click(coconutCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total topping first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const chipsCheckbox = await screen.findByRole('checkbox', {
      name: 'chocolate chips topping',
    });
    userEvent.click(chipsCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla scoop',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('3.50');
  });
  test('grand total with item removal', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const chipsCheckbox = await screen.findByRole('checkbox', {
      name: 'chocolate chips topping',
    });
    userEvent.click(chipsCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla scoop',
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('3.50');

    userEvent.click(chipsCheckbox);
    userEvent.type(vanillaInput, '0');

    expect(grandTotal).toHaveTextContent('0.00');
  });
});
