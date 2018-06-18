import {VIDEO, PHOTOS, CODE, ANNOUNCEMENT, REPO, MEETUP} from './slideTypes.js';

const VIDEO_ICON = 'fa-youtube';
const PHOTOS_ICON = 'fa-camera-retro';
const CODE_ICON = 'fa-code';
const ANNOUNCEMENT_ICON = 'fa-calendar';
const REPO_ICON = 'fa-github';
const MEETUP_ICON = 'fa-calendar';



export default function getIcons(iconType) {
  switch (iconType) {
    case VIDEO:
      {
        return VIDEO_ICON;
      }
    case PHOTOS:
      {
        return PHOTOS_ICON;
      }
    case CODE:
      {
        return CODE_ICON;
      }
    case ANNOUNCEMENT:
      {
        return ANNOUNCEMENT_ICON;
      }
    case REPO:
      {
        return REPO_ICON;
      }
    case MEETUP:
      {
        return MEETUP_ICON;
      }
    default:
      console.log('Sorry, there are no icons');
  }
}
