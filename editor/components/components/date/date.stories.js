import { storiesOf } from "@storybook/html";
import Editor from "../base/editor/editor";
import "./index";

storiesOf("Date", module)
  .addDecorator(Editor.dummySetup)
  .addDecorator(Editor.decorator)
  .add(
    "Simple",
    () =>
      `<ck-date value="2019-12-02"></ck-date>`
  );
