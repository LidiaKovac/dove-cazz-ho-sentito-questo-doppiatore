import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CompareCardComponent } from './compare-card.component';
import { SingleCharacterCardComponent } from '../single-character-card/single-character-card.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<CompareCardComponent> = {
  title: 'Example/Compare card',
  component: CompareCardComponent,
  subcomponents: { SingleCharacterCardComponent },
  decorators: [
    moduleMetadata({
      declarations: [CompareCardComponent, SingleCharacterCardComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    name: {
      type: 'string',
    },

    characters: {
      control: { type: 'object' },
    },
  },
  // decorators: [
  //   (story, { args }) => {
  //     return story({ args: { ...args, works: ["Work 1", "Work 2", "Work 3"] } })
  //   }
  // ]
};

export default meta;
const Template: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="compare-card">
  <h2>{{name}}</h2>
  <app-single-character-card
    *ngFor="let work of works"
    [name]="work.character"
    [img]="work.characterImg"
    [work]="work.work" ></app-single-character-card>
</div>

    `,
  }),
};
type Story = StoryObj<CompareCardComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    name: 'Stefano Crescentini',
    characters: [
      {
        title: 'Supernatural (serie televisiva)',
        character: [
          {
            _id: '',
            wikiSlug: '',
            name: 'Jensen Ackles',
            img: 'https://source.boringavatars.com/beam/120/Jensen?colors=4d9de0,c9e6fe,ee7b30',
          },
        ],
      },
      {
        title: 'Death Note',
        character: [
          {
            _id: '',
            wikiSlug: '',
            name: 'Elle',
            img: 'https://source.boringavatars.com/beam/120/Elle?colors=4d9de0,c9e6fe,ee7b30',
          },
        ],
      },
      {
        title: 'Death Note',
        character: [
          {
            _id: '',
            wikiSlug: '',
            name: 'Elle',
            img: 'https://source.boringavatars.com/beam/120/Elle?colors=4d9de0,c9e6fe,ee7b30',
          },
        ],
      },
      {
        title: 'Death Note',
        character: [
          {
            _id: '',
            wikiSlug: '',
            name: 'Elle',
            img: 'https://source.boringavatars.com/beam/120/Elle?colors=4d9de0,c9e6fe,ee7b30',
          },
        ],
      },
    ],
  },
};
