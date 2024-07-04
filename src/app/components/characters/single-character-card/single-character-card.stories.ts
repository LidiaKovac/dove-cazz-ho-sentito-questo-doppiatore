import type { Meta, StoryObj } from '@storybook/angular';
import { SingleCharacterCardComponent } from './single-character-card.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SingleCharacterCardComponent> = {
  title: 'Example/Single character card',
  component: SingleCharacterCardComponent,
  tags: ['autodocs'],
  argTypes: {
    img: {
      type: "string",

    },
    name: {
      type: "string"
    },
    work: {
      type: "string"
    }
  },
  // decorators: [
  //   (story, { args }) => {
  //     return story({ args: { ...args, works: ["Work 1", "Work 2", "Work 3"] } })
  //   }
  // ]
};

export default meta;
type Story = StoryObj<SingleCharacterCardComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    img: "https://source.boringavatars.com/beam/120/Stefano?colors=4d9de0,c9e6fe,ee7b30",
    name: "Stefano Crescentini",
    work: "Elle"
  },
};

