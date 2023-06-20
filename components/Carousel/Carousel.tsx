import React, { useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import globalStyles from "@/styles/globalStyles.module.scss";

interface CarouselProps {
	images: string[];
	video?: string | null;
}

const Carousel: React.FC<CarouselProps> = ({
	images,
	video,
}: CarouselProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const videoRef = useRef<HTMLVideoElement | null>(null);

	const handleMouseEnter = () => {
		if (videoRef.current) {
			videoRef.current.play();
		}
	};

	const handleMouseLeave = () => {
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
	};

	const handleThumbnailClick = (index: number) => {
		setActiveIndex(index);
		console.log("Handle Click");
		videoRef.current && videoRef.current.load();
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
				{activeIndex == 0 && video && (
					<video
						ref={videoRef}
						className={styles.mainImage}
						poster={images[activeIndex]}
						controls
					>
						<source src={video} type="video/mp4" />
					</video>
				)}
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
