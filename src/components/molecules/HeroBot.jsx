import BotScene from '../three/BotScene.jsx';

export default function HeroBot({ url, skipStart }) {
  return (
    <div className="bot-immersive">
      <div className="bot-halo" />
      <div className="bot-stage">
        <BotScene url={url} skipStart={skipStart} />
      </div>
    </div>
  );
}
