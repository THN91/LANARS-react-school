import {IPhoto} from './Photo';
import {IAlbum} from './Album';

enum Status {
  IDLE,
  PENDING,
  SUCCEEDED,
  FAILED,
}

export interface IPhotoState {
  photos: IPhoto[];
  loading: keyof typeof Status;
  error: string;
}

export interface IAlbumState {
  album: IAlbum[];
  loading: keyof typeof Status;
  error: string;
}

export interface IActionState {
  loading: string;
  error?: string;
}
