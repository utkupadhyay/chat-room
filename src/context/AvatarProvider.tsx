import React, { createContext, useState } from 'react';

interface AvatarContextProps {
  avatarURL: string;
  setAvatarURL: React.Dispatch<React.SetStateAction<string>>;
}

const AvatarContext = createContext<AvatarContextProps>({
  avatarURL: '',
  setAvatarURL: () => {},
});

const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [avatarURL, setAvatarURL] = useState<string>(
    localStorage.getItem('profile-url') || ''
  );
  return (
    <AvatarContext.Provider value={{ avatarURL, setAvatarURL }}>
      {children}
    </AvatarContext.Provider>
  );
};

export default AvatarProvider;
export { AvatarContext };
