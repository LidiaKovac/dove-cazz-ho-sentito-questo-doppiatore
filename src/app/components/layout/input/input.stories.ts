import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Example/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      type: 'string',
    },
    defaultValue: {
      type: 'string',
    },
  },
  args: {
    placeholder: 'Example',
    defaultValue: null,
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Primary: Story = {
  args: {
    placeholder: 'Email',
    defaultValue: null,
  },
};
