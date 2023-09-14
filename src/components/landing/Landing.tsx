import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import { getAllFileUrls } from '../../services/firebase';
import { Channels } from '../AuthenticatedApp';
import { AvatarContext } from '../../context/AvatarProvider';
interface ChannelsProp {
  channels: Channels[];
}
const Landing = ({ channels }: ChannelsProp) => {
  const [showSettingsPanel, setShowSettingsPanel] = useState<Boolean>(false);
  const [avatarList, setAvatarList] = useState<string[]>([]);
  const { avatarURL, setAvatarURL } = useContext(AvatarContext);
  const showSettingsPanelToggle = () => {
    setShowSettingsPanel(!showSettingsPanel);
  };
  const fetchAvatarData = async () => {
    try {
      const data = await getAllFileUrls('avatars');
      if (data && data.length > 0) {
        setAvatarList(data);
      }
    } catch (e) {
      console.error('Unable to fetch avatars');
    }
  };
  useEffect(() => {
    fetchAvatarData();
  }, []);

  const setProfileImage = (e: any) => {
    const imageURL = e.target.src;
    localStorage.setItem('profile-url', imageURL);
    setAvatarURL(imageURL);
  };
  return (
    <>
      <h2>Select a Channel</h2>
      <div onClick={showSettingsPanelToggle}>Settings</div>
      <>
        {showSettingsPanel && <>Select an avatar</>}
        {showSettingsPanel && (
          <div className="avatar-container">
            {avatarList?.map((avatar, i) => (
              <img
                src={avatar}
                alt=""
                width="48px"
                height="48px"
                key={i}
                onClick={setProfileImage}
                className="avatar-img"
              />
            ))}
          </div>
        )}
        <>
          Current avatar:
          <img
            src={avatarURL}
            width="48px"
            height="48px"
            alt=""
            className="avatar-img"
          />
        </>
      </>
      <ul>
        {channels &&
          channels?.map((room) => (
            <li key={room.id}>
              <Link to={`/room/${room.id}`}>{room.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Landing;
