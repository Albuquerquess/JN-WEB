import React from 'react';

import { Container } from './styles';

interface IImageButtonProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  label: string | undefined;
}

const ImageButton: React.FC<IImageButtonProps> = ({ setFile, label }) => {
  const [filename, setFilename] = React.useState<string>('');
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const fileUploaded = input.files[0];
    setFile(fileUploaded);
    setFilename(fileUploaded.name);
  };

  return (
    <Container className="gray-button" onClick={handleClick}>
      <span id="text">{filename || label || 'Imagem'}</span>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none', overflow: 'hidden' }}
      />
    </Container>
  );
};

export default ImageButton;
