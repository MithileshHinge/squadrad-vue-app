import { BASE_DOMAIN } from '../config';

export default function getProfilePicSrc(profilePic) {
	return `${BASE_DOMAIN}/images/profilePics/${profilePic}`;
}
