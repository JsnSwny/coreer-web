import React, { useState } from "react";
import ImageUploadButton from "../ImageUploadButton/ImageUploadButton";
import globalStyles from "@/styles/globalStyles.module.scss";
import styles from "./GalleryInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { server } from "@/config";
import { ProjectImage } from "@/interfaces/project.model";

interface GalleryInputProps {
	galleryImages: ProjectImage[];
	setGalleryImages: (images: ProjectImage[]) => void;
}

const GalleryInput = ({
	galleryImages,
	setGalleryImages,
}: GalleryInputProps) => {
	const handleImageAdd = async (file: ProjectImage) => {
		// Add the new image to the list
		setGalleryImages([...galleryImages, file]);
	};

	const handleImageRemove = async (file: ProjectImage) => {
		await axios.delete(`${server}/api/project-images/${file.id}/`);
		setGalleryImages(galleryImages.filter((item) => item.id != file.id));
	};

	return (
		<div className={globalStyles.formGroup}>
			<label className={globalStyles.label}>Gallery Images</label>
			<ImageUploadButton onImageAdd={handleImageAdd} />
			<div className={styles.imageList}>
				{galleryImages.map((image, index) => (
					<div key={index} className={styles.imageWrapper}>
						<div className={globalStyles.aspect_ratio_16x9}>
							<img
								src={image.image}
								alt={`Image ${index}`}
								style={{ width: "100%" }}
							/>
						</div>
						<FontAwesomeIcon
							icon={faXmarkCircle}
							className={styles.delete}
							onClick={() => handleImageRemove(image)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default GalleryInput;
