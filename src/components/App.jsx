import { useState } from 'react';

import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { ImageDetailsPage } from './ImageDetailsPage';
import { Footer } from './Footer';

import './App.css';

export function App() {
	const [imageData, setImageData] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);

	function onSearchSubmit(query) {
		// Search for the users's query.
		// TODO: render the results, instead of logging them to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/api.js
		searchArtworks(query).then((json) => {
			setImageData(json.data);
		});
	}

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			{selectedImage ? (
				<ImageDetailsPage
					details={
						selectedImage ?? {
							details: '',
							artist_title: '',
							image_id: '',
							thumbnail: { alt_text: '', height: '', width: '' },
						}
					}
					handleSelectedImage={setSelectedImage}
				/>
			) : (
				<>
					<SearchForm onSearchSubmit={onSearchSubmit} />
					{imageData.length > 0 && (
						<ul>
							{imageData.map((data) => {
								const { image_id, title, artist_title } = data;
								return (
									<li key={image_id}>
										<button
											onClick={() => setSelectedImage(data)}
										>{`${title} by ${artist_title ?? 'Unknown'}`}</button>
									</li>
								);
							})}
						</ul>
					)}
				</>
			)}
			<Footer />
		</div>
	);
}
