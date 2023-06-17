import React, { useState } from "react";
import styles from "./Carousel.module.scss";
import globalStyles from "@/styles/globalStyles.module.scss";

interface CarouselProps {
	images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleThumbnailClick = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<div className={styles.carouselGallery}>
			<div
				className={`${styles.mainImageWrapper} ${globalStyles.aspect_ratio_16x9}`}
			>
				<img
					src={images[activeIndex]}
					alt="Main Image"
					className={styles.mainImage}
				/>
			</div>
			<div className={styles.imageList}>
				{images.map((image, index) => (
					<div
						key={index + 1}
						className={`${styles.thumbnailWrapper} ${
							activeIndex == index ? styles.active : ""
						}`}
					>
						<div className={globalStyles.aspect_ratio_16x9}>
							<img
								src={image}
								alt={`Thumbnail ${index + 1}`}
								className={styles.thumbnail}
								onClick={() => handleThumbnailClick(index)}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
