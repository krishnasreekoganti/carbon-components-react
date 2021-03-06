/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { iconAddSolid, iconSearch } from 'carbon-icons';
import AddFilled16 from '@carbon/icons-react/lib/add--filled/16';
import Search16 from '@carbon/icons-react/lib/search/16';
import Button from '../Button';
import ButtonSkeleton from '../Button/Button.Skeleton';
import { breakingChangesX } from '../../internal/FeatureFlags';

const icons = {
  None: 'None',
};

if (breakingChangesX) {
  icons['Add with filled circle (iconAddSolid from `carbon-icons`)'] =
    'iconAddSolid';
  icons['Search (iconSearch from `carbon-icons`)'] = 'iconSearch';
}

icons['Add with filled circle (AddFilled16 from `@carbon/icons`)'] =
  'AddFilled16';
icons['Search (Search16 from `@carbon/icons`)'] = 'Search16';

const iconMap = {
  iconAddSolid,
  iconSearch,
  AddFilled16,
  Search16,
};

const kinds = {
  'Primary button (primary)': 'primary',
  'Secondary button (secondary)': 'secondary',
  'Danger button (danger)': 'danger',
  'Danger primary button (danger--primary)': 'danger--primary',
  'Ghost button (ghost)': 'ghost',
};

const props = {
  regular: () => {
    const iconToUse = iconMap[select('Icon (icon)', icons, 'none')];
    return {
      className: 'some-class',
      kind: select('Button kind (kind)', kinds, 'primary'),
      disabled: boolean('Disabled (disabled)', false),
      small: boolean('Small (small)', false),
      renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
      icon: !iconToUse || !iconToUse.svgData ? undefined : iconToUse,
      onClick: action('onClick'),
      onFocus: action('onFocus'),
    };
  },
  set: () => {
    const iconToUse = iconMap[select('Icon (icon)', icons, 'none')];
    return {
      className: 'some-class',
      disabled: boolean('Disabled (disabled)', false),
      small: boolean('Small (small)', false),
      renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
      icon: !iconToUse || !iconToUse.svgData ? undefined : iconToUse,
      onClick: action('onClick'),
      onFocus: action('onFocus'),
    };
  },
};

const CustomLink = ({ children, href, ...other }) => (
  <a href={href} {...other}>
    {children}
  </a>
);

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const regularProps = props.regular();
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Button {...regularProps} className="some-class">
            Button
          </Button>
          &nbsp;
          <Button {...regularProps} href="#" className="some-class">
            Link
          </Button>
          &nbsp;
          <Button {...regularProps} as="p" href="#" className="some-class">
            Element
          </Button>
          &nbsp;
          <Button
            {...regularProps}
            as={CustomLink}
            href="#"
            className="some-class">
            Custom component
          </Button>
        </div>
      );
    },
    {
      info: {
        text: `
          Buttons are used to initialize an action, either in the background or
          foreground of an experience.

          There are several kinds of buttons.

          Primary buttons should be used for the principle call to action
          on the page.

          Secondary buttons should be used for secondary actions on each page.

          Danger buttons should be used for a negative action (such as Delete) on the page.

          Modify the behavior of the button by changing its event properties.

          Small buttons may be used when there is not enough space for a
          regular sized button. This issue is most found in tables. Small button should have three words
          or less.

          When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are
          always paired with text.
        `,
      },
    }
  )
  .add(
    'Sets of Buttons',
    () => {
      const setProps = props.set();
      return (
        <div>
          <Button kind="secondary" {...setProps}>
            Secondary button
          </Button>
          <Button kind="primary" {...setProps}>
            Primary button
          </Button>
        </div>
      );
    },
    {
      info: {
        text: `
          When an action required by the user has more than one option, always use a a negative action button (secondary) paired with a positive action button (primary) in that order. Negative action buttons will be on the left. Positive action buttons should be on the right. When these two types buttons are paired in the correct order, they will automatically space themselves apart.
        `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div>
        <ButtonSkeleton />
        &nbsp;
        <ButtonSkeleton href="#" />
        &nbsp;
        <ButtonSkeleton small />
      </div>
    ),
    {
      info: {
        text: `
          Placeholder skeleton state to use when content is loading.
        `,
      },
    }
  );
