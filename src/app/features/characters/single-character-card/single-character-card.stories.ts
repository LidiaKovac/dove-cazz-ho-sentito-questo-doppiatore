import type { Meta, StoryObj } from '@storybook/angular';
import { SingleCharacterCardComponent } from './single-character-card.component';

const meta: Meta<SingleCharacterCardComponent> = {
  title: 'Example/Single character card',
  component: SingleCharacterCardComponent,
  tags: ['autodocs'],
  argTypes: {
    img: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    work: {
      type: 'string',
    },
  },

};

export default meta;
type Story = StoryObj<SingleCharacterCardComponent>;

export const Primary: Story = {
  args: {
    img: 'https://source.boringavatars.com/beam/120/Stefano?colors=4d9de0,c9e6fe,ee7b30',
    name: 'Stefano Crescentini',
    work: 'Elle',
  },
};
