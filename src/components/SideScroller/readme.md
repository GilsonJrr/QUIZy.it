# SideScroller Component Documentation

## Overview

The `SideScroller` component is a React component designed to display a horizontally scrollable list of items. It allows users to navigate through a collection of items when the collection exceeds the available display space.

## Props

The component accepts the following props:

- `title`: (string or ReactNode) - The title of the scroller.
- `displayQuantity`: (number) - The number of items to display at a time.
- `collection`: (Array) - An array of items to be displayed in the scroller.
- `renderItem`: (Function) - A function that takes an item from the collection and returns a ReactNode to render that item.
- `backgroundColor`: (string, optional) - The background color of the scroller.

## State Variables

- `step`: (number) - Keeps track of the current step (position) within the divided collection.
- `navigated`: (boolean) - Indicates whether the user has navigated through the collection.
- `notLongEnough`: (boolean) - Indicates whether the collection is not long enough to require scrolling.

## Functions

### useEffect

- Purpose: Checks if the collection is long enough to require scrolling.
- Dependencies: `collection`, `displayQuantity`.

### splitArray

- Purpose: Splits the collection into smaller arrays to enable smooth scrolling.
- Parameters: `array` (Array) - The array to be split, `size` (number) - The size of each sub-array.
- Returns: An array of smaller arrays.

### handleScroll

- Purpose: Handles scrolling behavior based on the direction.
- Parameters: `direction` (string) - The direction of scrolling ('forward' or 'backward'), `size` (number) - The size of the collection.
- Updates: `step` - Updates the current step based on the scrolling direction.

## Rendering

The component renders a container with the following elements:

1. Title: Displays the title of the scroller.
2. Left Scroll Button: Allows the user to scroll backward through the collection.
3. Central Items Container: Contains the items to be displayed, with dynamic rendering based on the current step.
4. Right Scroll Button: Allows the user to scroll forward through the collection.

## Usage

Example usage of the `SideScroller` component:

```jsx
<SideScroller
  title="Featured Items"
  displayQuantity={4}
  collection={featuredItems}
  renderItem={(item) => <FeaturedItemCard key={item.id} item={item} />}
  backgroundColor="#f0f0f0"
/>
```
