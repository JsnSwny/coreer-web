import React, { ChangeEvent, useRef } from "react";
import styles from "./ImageUploadButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { server } from "@/config";
import { ProjectImage } from "@/interfaces/project.model";

interface ImageUploadButtonProps {
	onImageAdd: (data: ProjectImage) => void;
}

const ImageUploadButton = ({ onImageAdd }: ImageUploadButtonProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		fileInputRef.current && fileInputRef.current.click();
	};

	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};

	const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const formData = new FormData();
			formData.append("image", file);
			const imageResponse = await axios.post(
				`${server}/api/project-images/`,
				formData,
				config
			);
			onImageAdd(imageResponse.data);
		}
	};

	return (
		<div>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				className={styles.fileInput}
				onChange={handleFileInputChange}
			/>
			<button type="button" className={styles.addButton} onClick={handleClick}>
				Add Image <FontAwesomeIcon icon={faUpload} />
			</button>
		</div>
	);
};

export default ImageUploadButton;
