<template>
	<b-container class="p-0" fluid>
		<div id="sq-the-cover-pic">
			<svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><g opacity="0.3"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="-594" y="-1408" width="1548" height="1548"><circle cx="180" cy="-634" r="774" fill="#C4C4C4"/></mask><g mask="url(#mask0)"><rect width="360" height="140" fill="url(#paint0_radial)"/></g></g><g opacity="0.35"><mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="-349" y="-918" width="1058" height="1058"><circle cx="180" cy="-389" r="529" fill="#C4C4C4"/></mask><g mask="url(#mask1)"><rect width="360" height="140" fill="url(#paint1_radial)"/></g></g><mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="-220" y="-660" width="800" height="800"><circle cx="180" cy="-260" r="400" fill="#C4C4C4"/></mask><g mask="url(#mask2)"><rect width="360" height="140" fill="url(#paint2_radial)"/></g><defs><radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 140) rotate(-90) scale(140 442.129)"><stop stop-color="#FF3D77"/><stop offset="1" stop-color="#BB57A4"/></radialGradient><radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 140) rotate(-90) scale(140 442.129)"><stop stop-color="#FF3D77"/><stop offset="1" stop-color="#BB57A4"/></radialGradient><radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 140) rotate(-90) scale(140 442.129)"><stop stop-color="#FF3D77"/><stop offset="1" stop-color="#BB57A4"/></radialGradient></defs></svg>
		</div>
		<b-row no-gutters>
			<b-col align-self="center">
				<b-avatar id="sq-the-profile-pic" src="@/assets/tushar.png" size="8.5rem"></b-avatar>
			</b-col>
		</b-row>
		<b-row no-gutters>
			<b-col id="sq-the-page-name">
				{{ creator.pageName }}
			</b-col>
		</b-row>
		<b-row no-gutters>
			<b-col id="sq-the-page-bio">
				is creating {{ creator.pageBio }}
			</b-col>
		</b-row>
		<b-row no-gutters align-h="center">
			<b-col v-if="creator.instagramLink" class="sq-creator-social-btn sq-shadow" cols="auto">
				<b-icon-instagram></b-icon-instagram>
			</b-col>
			<b-col v-if="creator.youtubeLink" class="sq-creator-social-btn sq-shadow" cols="auto">
				<svg width="1.25rem" height="0.875rem" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99927 14C9.9976 14 9.99576 14 9.99393 14C9.39045 13.996 4.05537 13.9489 2.54383 13.5529C1.48746 13.2778 0.653572 12.4709 0.368843 11.4475C-0.0266648 10.0092 -0.00148784 7.24004 0.00125875 7.01892C-0.00133525 6.79883 -0.0268174 4.00676 0.367622 2.55662C0.36808 2.55529 0.368385 2.55381 0.368843 2.55248C0.650368 1.54074 1.50303 0.708883 2.54124 0.433075C2.54383 0.432336 2.54658 0.431745 2.54917 0.431006C4.04362 0.0505501 9.38923 0.0039908 9.99393 0H10.0048C10.6098 0.0039908 15.9591 0.0511413 17.4567 0.447708C18.5103 0.722038 19.3436 1.52788 19.6291 2.54997C20.0394 4.00114 20.0014 6.79928 19.9973 7.03547C20.0002 7.26812 20.0241 10.0125 19.6309 11.458C19.6306 11.4595 19.6302 11.4608 19.6299 11.4622C19.345 12.4856 18.5112 13.2924 17.4536 13.5678C17.4523 13.5683 17.4508 13.5686 17.4494 13.569C15.9551 13.9493 10.6093 13.9959 10.0048 14C10.0029 14 10.0011 14 9.99927 14ZM1.87794 2.94476C1.53065 4.22477 1.56345 6.98123 1.56376 7.00902V7.02897C1.55338 7.79343 1.58985 10.0073 1.87809 11.0558C2.01786 11.5579 2.42908 11.9557 2.95063 12.0915C4.06589 12.3837 8.41114 12.4757 9.99927 12.4865C11.5915 12.4757 15.9432 12.3862 17.0502 12.1057C17.5701 11.9694 17.9799 11.573 18.1206 11.0703C18.4092 10.0064 18.4453 7.80333 18.4348 7.04375C18.4348 7.03577 18.4348 7.02779 18.4349 7.01981C18.4493 6.24618 18.4211 4.00646 18.122 2.94949C18.1217 2.94846 18.1214 2.94742 18.1212 2.94639C17.9808 2.44207 17.5695 2.04432 17.0479 1.90849C15.9435 1.61598 11.5912 1.52434 9.99927 1.51355C8.40809 1.52434 4.06071 1.61361 2.95032 1.89385C2.4387 2.03131 2.01817 2.44325 1.87794 2.94476ZM18.8755 11.2653H18.8759H18.8755ZM8.00785 10.0648V3.93507L13.4766 7L8.00785 10.0648Z" fill="currentColor"/></svg>
			</b-col>
		</b-row>
		<b-row no-gutters align-h="center">
			<b-col v-if="creator.supportersVisibility" cols="auto" class="mt-2 mx-3">
				<div class="sq-creator-public-stat">
					{{ creator.supporters }}
				</div>
				<div class="sq-text sq-muted">Members</div>
			</b-col>
			<b-col v-if="creator.earningsVisibility" cols="auto" class="mt-2 mx-3">
				<div class="sq-creator-public-stat">
					<span class="sq-rupee"/>{{ creator.earnings }}
				</div>
				<div class="sq-text sq-muted">Per month</div>
			</b-col>
			<b-col v-if="creator.otpVisibility" cols="auto" class="mt-2 mx-3">
				<div class="sq-creator-public-stat">
					<span class="sq-rupee"/>{{ creator.otp }}
				</div>
				<div class="sq-text sq-muted">One time</div>
			</b-col>
		</b-row>
		<b-row no-gutters align-h="center" class="mt-5 mb-2">
			<b-col cols="auto" class="sq-creator-section-heading">
				<span v-if="squads.length>0">Select a membership squad</span>
				<span v-else>Add a membership squad</span>
			</b-col>
			<b-col cols="auto" class="ml-1">
				<b-icon-plus-circle-fill font-scale="1.5"/>
			</b-col>
		</b-row>
		<b-row no-gutters align-h="center">
			<b-col v-for="(squad, i) in squads" :key="squad.id" class="mt-3 mx-2" cols="auto">
				<SquadCard :squad="squad" :squadNo="i" :totalSquads="squads.length"/>
			</b-col>
		</b-row>
		<b-row no-gutters align-h="center" class="mt-5 mb-2">
			<b-col cols="auto" class="sq-creator-section-heading">
				About
			</b-col>
			<b-col cols="auto" class="ml-1">
				<b-iconstack font-scale="1.5">
					<b-icon icon="circle-fill" stacked/>
					<b-icon icon="pencil-fill" variant="light" scale="0.45" stacked/>
				</b-iconstack>
			</b-col>
		</b-row>
		<b-row no-gutters align-h="center">
			<b-col class="mt-2 px-3" cols="auto">
				<b-card class="sq-card-flat p-2">
					<b-card-text class="sq-text text-center">
						{{ creator.about }}
					</b-card-text>
				</b-card>
			</b-col>
		</b-row>
		<b-row no-gutters align-h="center" class="mt-5 mb-2">
			<b-col cols="auto" class="sq-creator-section-heading">
				Posts
			</b-col>
			<b-col cols="auto" class="ml-1">
				<b-icon-plus-circle-fill font-scale="1.5"/>
			</b-col>
		</b-row>
		<b-row no-gutters align-h="center">
			<b-col class="mt-2" cols="auto">
				<b-card class="sq-card-flat p-1">
					<PostComp v-for="post in posts" :key="post.id" :post="post"></PostComp>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import SquadCard from '@/components/SquadCard.vue';
import PostComp from '@/components/PostComp.vue';

export default {
	data() {
		return {
			creator: {
				userId: 1,
				pageName: 'Tushar Sawant',
				pageBio: 'Youtuber',
				profilePic: 'tushar.png',
				coverPic: null,
				about: 'Random Thought Bullets is a YouTube channel that makes some Random Youth videos.',
				introVideo: null,
				slug: 'rtb',
				supportersVisibility: true,
				supporters: 12,
				earningsVisibility: true,
				earnings: 4600,
				otpVisibility: true,
				otp: 8000,
				youtubeLink: 'randomyoutubelink',
				instagramLink: '2shar_sawant',
				facebookLink: null,
			},
			squads: [
				{
					id: 1,
					userId: 1,
					title: 'RTBees',
					image: 'tushar.png',
					description: 'Early access to all videos',
					amount: 50,
					supportersLimit: null,
				},
				{
					id: 2,
					userId: 1,
					title: 'RTBees Pro',
					description: 'All the benefits from previous squad and your name would be mentioned in my video description',
					amount: 100,
					supportersLimit: null,
				},
				{
					id: 3,
					userId: 1,
					title: 'RTBees Pro Max',
					description: 'All the benefits from previous squad and your name would be mentioned in my video description',
					amount: 250,
					supportersLimit: null,
				},
				{
					id: 4,
					userId: 1,
					title: 'RTQueenBee',
					image: 'tushar.png',
					description: 'All the benefits from the previous squads. Get 10 one on one training sessions with RTB Team',
					amount: 15000,
					supportersLimit: null,
				},
			],
			posts: [{
				id: 1,
				creator: 'Tushar Sawant',
				description: 'New comic exclusive pre-release for you guys! Let me know your thoughts in the comments',
				time: '3d',
				path: 'brownpaperbag-comic.png',
				numComments: 4,
				numLikes: 30,
			},
			{
				id: 2,
				creator: 'Tushar Sawant',
				description: 'New comic exclusive pre-release for you guys! Let me know your thoughts in the comments',
				time: '3d',
				path: 'brownpaperbag-comic.png',
				numComments: 4,
				numLikes: 30,
			}],
		};
	},
	components: {
		SquadCard,
		PostComp,
	},
};
</script>

<style lang="scss" scoped>

#sq-the-cover-pic {
	//background-image: radial-gradient(122.81% 100% at 50% 100%, $french-rose 0%, $mulberry-crayola 100%);
	width: 100%;
	height: 30vh;
	position: relative;
}

#sq-the-cover-pic > svg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}

#sq-the-profile-pic {
	margin-top: -4.25rem;
	border: 4px solid #FFFFFF;
	filter: drop-shadow(0px 10px 20px rgba($color: $my-color-dark, $alpha: 0.2));
}

#sq-the-page-name {
	margin-top: 0.625rem;
	font-size: 1.375rem;
	font-weight: 700;
	letter-spacing: -0.01em;
	color: $my-color-dark;
	text-align: center;
}

#sq-the-page-bio {
	font-size: 1rem;
	font-weight: 500;
	color: $my-color-gray2;
	text-align: center;
}

.sq-creator-social-btn {
	display: flex;
	height: 2.75rem;
	width: 2.75rem;
	background-color: #ffffff;
	color: $my-color-dark;
	//box-shadow: 0px 5px 20px rgba($color: $my-color-dark, $alpha: 0.15);
	border-radius: 50%;
	margin: 0.625rem 0.3125rem 0.625rem 0.3125rem;
}

.sq-creator-social-btn > svg {
	margin: auto;
}

.sq-creator-public-stat {
	font-size: 1.25rem;
	font-weight: 400;
	text-align: center;
	color: $my-color-gray1;
}

.sq-creator-section-heading {
	display: flex;
	align-items: center;
	font-size: 1rem;
	font-weight: 500;
	color: $my-color-dark;
	letter-spacing: -0.01em;
}

</style>
