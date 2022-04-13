import { Form, ActionPanel, Action, Clipboard, showHUD } from "@raycast/api";
import { shuffle } from "./shuffle";

interface CommandForm {
  array: string;
  choice: number;
}

export default function Command() {
  async function handleSubmit(values: CommandForm) {
    const valuesArray = values.array.split(",");
    const shuffleArray = shuffle(valuesArray).join(",");
    if (values.choice) {
      const sliceArray = valuesArray.slice(0, values.choice).join(",");
      await Clipboard.copy(sliceArray);
      await showHUD(`Copied to clipboard : ${sliceArray}`);
    } else {
      await Clipboard.copy(shuffleArray);
      await showHUD(`Copied to clipboard : ${shuffleArray}`);
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="array" title="Array" placeholder="hoge,fuga,muga" defaultValue="" />
      <Form.TextField id="choice" title="Number of choices" placeholder="1 (optional)" defaultValue="" />
    </Form>
  );
}
