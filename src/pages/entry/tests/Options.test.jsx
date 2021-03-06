import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each toppings option from server', async () => {
  render(<Options optionType="toppings" />);
  const toppingImgs = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingImgs).toHaveLength(3);

  const altText = toppingImgs.map((element) => element.alt);
  expect(altText).toEqual([
    'coconut topping',
    'chocolate chips topping',
    'hot fudge topping',
  ]);
});
