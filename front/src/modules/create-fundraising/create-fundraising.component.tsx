import { useTheme } from "@emotion/react";
import { ChangeEvent, useCallback, useState } from "react";
import { useAccount } from "wagmi";
import {
  Button,
  FileUpload,
  Input,
  NumberInput,
  Spacer,
  TextArea,
} from "../../common/components";
import {
  column,
  container,
  form,
  formContainer,
  middleInputContainer,
  title,
} from "./create-fundraising.styles";
import { useCreateCreateFundraising } from "./hooks/use-create-fundraising.hook";

export function CreateFundraising() {
  const [image, setImage] = useState<File | null>(null);
  const [titleValue, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const [duration, setDuration] = useState(0);

  const { createFundraising } = useCreateCreateFundraising();

  const { address } = useAccount();
  const handleSubmit = useCallback(async () => {
    if (address) {
      await createFundraising({
        title: titleValue,
        description,
        goal,
        duration,
        address,
      });
    }
  }, [createFundraising, titleValue, description, goal, duration, address]);

  function titleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function descriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  function fileUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) setImage(event.target.files[0]);
  }

  const theme = useTheme();
  return (
    <div css={container}>
      <h1 css={title(theme)}>
        Create
        <Spacer />
      </h1>
      <div css={formContainer}>
        <div css={form}>
          <div css={column}>
            <h2>
              Image
              <Spacer isThick={true} />
            </h2>

            <FileUpload
              value={image}
              id="file-upload"
              onChange={fileUpload}
              accept="image/jpg,image/jpeg,image/png"
            />
          </div>
          <div css={column}>
            <h2>
              Title
              <Spacer isThick={true} />
            </h2>
            <Input onChange={titleChange} />

            <div css={middleInputContainer}>
              <div>
                <h2>
                  Goal
                  <Spacer isThick={true} />
                </h2>
                <NumberInput defaultValue={0} min={0} onChange={setGoal} />
              </div>
              <div>
                <h2>
                  Duration in Days
                  <Spacer isThick={true} />
                </h2>
                <NumberInput defaultValue={0} min={0} onChange={setDuration} />
              </div>
            </div>

            <h2>
              Description
              <Spacer isThick={true} />
            </h2>
            <TextArea onChange={descriptionChange} />
          </div>
        </div>
        <div>
          <Button onClick={handleSubmit} text="Submit" />
        </div>
      </div>
    </div>
  );
}
