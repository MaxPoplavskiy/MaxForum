import { useTheme } from "@emotion/react";
import {
  container,
  fileUpload,
  image,
  previewContainer,
  uploadContainer,
  uploadImageText,
} from "./file-upload.styles";

type Properties = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value"
> & {
  value: File | null;
};

export const FileUpload: React.FC<Properties> = ({ ...rest }) => {
  const theme = useTheme();
  return (
    <div css={container}>
      {rest.value ? (
        <label htmlFor={rest.id} css={previewContainer}>
          <img
            src={URL.createObjectURL(rest.value)}
            alt="preview"
            css={image}
          />
        </label>
      ) : (
        <div css={uploadContainer(theme)}>
          <label htmlFor={rest.id}>
            <p css={uploadImageText(theme)}>Upload Image</p>
          </label>
        </div>
      )}
      <input type="file" css={fileUpload} {...rest} value={undefined} />
    </div>
  );
};
