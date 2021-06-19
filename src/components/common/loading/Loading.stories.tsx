// YourComponent.stories.tsx

import { Loading } from "./Loading";

//👇 This default export determines where your story goes in the story list
export default {
  title: "Loading",
  component: Loading,
};

export const LoadingGold = () => <Loading />;
