import { BASE_DOMAIN } from '../config';

export default function getProfilePicSrc(profilePic, isCreatorProfilePic) {
	return `${BASE_DOMAIN}/images/profilePics/${isCreatorProfilePic ? 'creators' : 'users'}/${profilePic}`;
}
