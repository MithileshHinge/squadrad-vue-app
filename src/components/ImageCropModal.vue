<template>
	<CustomModal modalTitle="Crop picture" @shown="setUpVueCropper" v-bind="$attrs" v-on="$listeners">
		<div :class="`sq-cropper ${cropBoxRectangular ? '' : 'sq-cropper-circle'}`">
			<VueCropper :src="imgDataURL" ref="cropper" style="max-height: 266px;" :viewMode="1" :autoCropArea="1" dragMode="move" :aspectRatio="aspectRatio === undefined ? 1 : aspectRatio" :guides="false" :center="false" :highlight="false" :background="false" :cropBoxMovable="false" :cropBoxResizable="cropBoxResizable" :toggleDragModeOnDblclick="false" :minContainerWidth="266" :minContainerHeight="266" @zoom="setZoomSlider">
			</VueCropper>
		</div>
		<b-row class="m-2">
			<b-col cols="auto" class="px-0">
				<b-icon-dash/>
			</b-col>
			<b-col>
				<b-form-input ref="sqCropperZoomSlider" type="range" :min="cropperZoomMinVal" :max="cropperZoomMinVal*8" step="0.001" :value="cropperZoom" @input="onInputCropperSlider"/>
			</b-col>
			<b-col cols="auto" class="px-0">
				<b-icon-plus/>
			</b-col>
		</b-row>
		<b-row class="m-2">
			<b-col cols="auto" class="pr-1 pl-0">
				<b-icon-arrow-counterclockwise font-scale="0.75"/>
			</b-col>
			<b-col>
				<b-form-input type="range" min="0" max="360" step="1" value="0" @input="$refs.cropper.rotateTo($event)"/>
			</b-col>
			<b-col cols="auto" class="pl-1 pr-0">
				<b-icon-arrow-clockwise font-scale="0.75"/>
			</b-col>
		</b-row>
		<ButtonSubmit modal :isProcessing="isUpdating" :buttonText="buttonText || 'Update profile picture'" @click="cropPicture"/>
	</CustomModal>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import CustomModal from '@/components/CustomModal.vue';
import ButtonSubmit from './ButtonSubmit.vue';

export default {
	props: {
		imgDataURL: String,
		isUpdating: Boolean,
		buttonText: String,
		aspectRatio: Number,
		cropBoxResizable: Boolean,
		cropBoxRectangular: Boolean,
	},
	data() {
		return {
			cropperZoom: 1,
			cropperZoomMinVal: 1,
		};
	},
	methods: {
		setUpVueCropper() {
			const { width, naturalWidth } = this.$refs.cropper.getImageData();
			const zoomMin = (width / naturalWidth);
			this.cropperZoomMinVal = zoomMin;
			this.cropperZoom = zoomMin;
		},
		setZoomSlider(event) {
			if (event.detail.originalEvent) {
				const { width, naturalWidth } = this.$refs.cropper.getImageData();
				this.cropperZoom = (width / naturalWidth);
			}
		},
		onInputCropperSlider(event) {
			this.$refs.cropper.zoomTo(event);
			this.cropperZoom = event;
		},
		cropPicture() {
			this.$refs.cropper.getCroppedCanvas({ maxHeight: 1080, maxWidth: 1080 }).toBlob((blob) => {
				this.$emit('cropped', blob);
			}, 'image/jpeg');
		},
	},
	components: {
		CustomModal,
		VueCropper,
		ButtonSubmit,
	},
};
</script>

<style lang="scss">

.sq-cropper-circle .cropper-crop-box, .sq-cropper-circle .cropper-view-box {
	border-radius: 50%;
}
.sq-cropper .cropper-view-box {
	border: 2px solid #ffffff;
    outline: 0;
}

</style>
