import React from 'react';

import Button from '../../components/button';
import Title from '../../components/title';
import { Container } from './styles';

const Video: React.FC = () => {
  return (
    <Container>
      <Title
        title="Não perca tempo com diversos orçamentos"
        subtitle="Veja o vídeo para entender como funciona o método"
      />

      <iframe
        src="https://www.youtube.com/embed/BlXE5loLe8M"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        id="video-youtube-iframe"
      />
      <Button navigateTo="/orcamento" />
    </Container>
  );
};

export default Video;
