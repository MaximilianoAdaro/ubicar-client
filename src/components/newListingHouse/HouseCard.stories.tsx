import { Meta, Story } from "@storybook/react";
import { HouseCard, HouseCardProps } from ".";

export default {
  title: "HouseCard",
  component: HouseCard,
  args: {
    house: {
      condition: "SALE",
      id: "id",
      price: 3000,
      title: "title",
      type: "Casa",
      address: {
        coordinates: {
          lat: 3,
          long: 3,
        },
        number: 9,
        street: "street",
        state: "state",
        city: "city",
      },
      fullBaths: 3,
      rooms: 5,
      squareFoot: 700,
    },
  },
} as Meta;

const Template: Story<HouseCardProps> = (args) => (
  <div
    style={
      {
        // width: 300,
      }
    }
  >
    <HouseCard {...args} />
  </div>
);

export const small = Template.bind({});
small.args = {};

export const large = Template.bind({});
large.args = {
  isLarge: true,
};
