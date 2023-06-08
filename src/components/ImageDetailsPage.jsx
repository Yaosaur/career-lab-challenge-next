import './ImageDetailsPage.css';

export function ImageDetailsPage({ details, handleSelectedImage }) {
	const { title, artist_title, image_id } = details;
	let { alt_text } = details.thumbnail;

	return (
		<>
			<header>
				<h1>
					<p>{`${title} `}</p>
					<p className="author">{`by ${artist_title ?? 'Unknown'}`}</p>
				</h1>
				<button onClick={() => handleSelectedImage(null)}>Back</button>
			</header>
			<img
				alt={alt_text}
				src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg/`}
			/>
		</>
	);
}
