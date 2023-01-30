import React, {Dispatch, SetStateAction} from 'react';

export interface IAlbumsProps {
  isOpen: boolean;
  handleOpen: () => void;
  setPhotos: Dispatch<SetStateAction<number[]>>;
}

export interface IAlbumAddPhoto {
  checkedPhotoId: (number | boolean)[];
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
