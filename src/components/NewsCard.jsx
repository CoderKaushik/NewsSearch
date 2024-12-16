import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

const NewsCard = ({ article }) => {
	const navigate = useNavigate();
	const [showFullText, setShowFullText] = useState(false);
	const [loading, setLoading] = useState(false);
	const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

	useEffect(() => {
		const handleStorageChange = () => {
			setDarkMode(localStorage.getItem("darkMode") === "true");
		};
		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	if (article.title === "[Removed]" || article.content === "[Removed]") {
		return null;
	}

	const content = showFullText
		? article.content
		: article.content.slice(0, 5000);

	const handleNavigate = () => {
		setLoading(true);
		navigate(`/article/${encodeURIComponent(article.title)}`, {
			state: { article },
		});
	};

	return (
		<div
			className={`shadow-2xl p-4 rounded mb-4 cursor-pointer transition-transform transform hover:scale-105`}
			onClick={handleNavigate}
		>
			{loading ? (
				<div className="flex justify-center items-center">
					<div className="loader"></div>
				</div>  
			) : (
				<>
					<img
						src={article.urlToImage}
						alt={article.title}
						className="w-full h-48 object-cover rounded"
					/>
					<h2 className="text-lg font-bold mt-2">{article.title}</h2>
					<p className="text-sm text-gray-600">{parse(content)}</p>
					{article.content.length > 5000 && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								setShowFullText(!showFullText);
							}}
							className="text-blue-500 mt-2"
						>
							{showFullText ? "Show Less" : "Show More"}
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default NewsCard;
