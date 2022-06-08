import React from 'react';
import { useToasts } from 'react-toast-notifications';

import { Container } from './styles';

interface IImageButtonProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  label: string | undefined;
}

const ImageButton: React.FC<IImageButtonProps> = ({ setFile, label }) => {
  const [filename, setFilename] = React.useState<string>('');
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const { addToast } = useToasts();

  const mimeTypesAllowed = ['image/jpeg', 'image/jpg', 'image/png'];

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleClickCheckFileSize = (file: File): any => {
    if (file && file.size > 3145728) {
      setFile(null);
      setFilename('');
      return addToast('O tamanho da imagem não pode ser maior que 3MB', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    if (!mimeTypesAllowed.includes(file.type)) {
      return addToast('O tipo de arquivo não é permitido', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    setFile(file);
    return setFilename(file.name);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const fileUploaded = input.files[0];

    handleClickCheckFileSize(fileUploaded);
  };

  return (
    <Container className="gray-button" onClick={handleClick}>
      <span id="text">{filename || label || 'Imagem'}</span>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        accept={String(mimeTypesAllowed)}
        style={{ display: 'none', overflow: 'hidden' }}
      />
    </Container>
  );
};

export default ImageButton;
