# SubjectCard Component Documentation

## Overview

The `SubjectCard` component is a React functional component used to display information about a subject or category, typically used in a quiz application.

## Props

- `subject`: An object containing information about the subject to be displayed. It should have the following structure:
  - `image`: A URL string representing the image associated with the subject.
  - `subTitle`: A string representing the subtitle or additional information about the subject.
  - `title`: A string representing the title or name of the subject.
  - `info`: An array of strings containing additional information about the subject.
  - `uid`: A unique identifier for the subject.
  - `difficult`: A string representing the difficulty level of the subject.
  - `type`: A string representing the type or category of the subject.

## Usage

```jsx
import React from "react";
import { SubjectCard } from "./components"; // Assuming the file containing the component is in a folder named "components"
import { collectionType } from "types/index"; // Importing the collectionType from the types folder

const MyComponent = () => {
  const subjectData: collectionType = {
    image: "url_to_image",
    subTitle: "Subtitle",
    title: "Subject Title",
    info: ["Info 1", "Info 2"],
    uid: "unique_id",
    difficult: "Difficulty Level",
    type: "Subject Type",
  };

  return (
    <div>
      <SubjectCard subject={subjectData} />
    </div>
  );
};

export default MyComponent;
```
