import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItems";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Fetch first page
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                props.setProgress(10);
                setLoading(true);
                setError(null);

                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&page=1&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;

                const response = await fetch(url);

                props.setProgress(30);

                const parsedData = await response.json();

                console.log("NewsAPI response:", parsedData);

                if (parsedData.status !== "ok") {
                    throw new Error(
                        parsedData.message || "Failed to fetch news"
                    );
                }

                const newArticles = parsedData.articles || [];
                const total = parsedData.totalResults || 0;

                setArticles(newArticles);
                setTotalResults(total);
                setPage(1);
                setHasMore(newArticles.length < total);

                props.setProgress(100);
            } catch (err) {
                console.error("News fetch failed:", err);
                setError(err.message || "Unable to load news.");
                props.setProgress(100);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [
        props.category,
        props.pageSize,
        props.apiKey,
        props.setProgress,
    ]);

    // Fetch next page
    const fetchMoreData = async () => {
        try {
            const nextPage = page + 1;

            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&page=${nextPage}&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;

            props.setProgress(30);

            const response = await fetch(url);

            props.setProgress(60);

            const parsedData = await response.json();

            console.log("Next page response:", parsedData);

            if (parsedData.status !== "ok") {
                throw new Error(
                    parsedData.message || "Failed to fetch more news"
                );
            }

            const nextArticles = parsedData.articles || [];

            const newArticles = [...articles, ...nextArticles];

            setArticles(newArticles);
            setPage(nextPage);

            // Stop when all articles have been loaded
            setHasMore(newArticles.length < totalResults);

            props.setProgress(100);
        } catch (err) {
            console.error("News fetchMoreData failed:", err);
            setHasMore(false);
            props.setProgress(100);
        }
    };

    return (
        <>
            <div className="container my-3">
                <h1 className="text-center">
                    {capitalizeFirstLetter(props.category)} News
                </h1>

                <p className="text-center text-muted">
                    Stay updated with the latest headlines from around the
                    world.
                </p>

                {loading && <Spinner />}

                {error && (
                    <div className="alert alert-danger text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<Spinner />}
                        endMessage={
                            <p className="text-center">
                                <b>You have seen all the news!</b>
                            </p>
                        }
                    >
                        <div className="row">
                            {articles.map((element) => {
                                return (
                                    <div
                                        className="col-md-4"
                                        key={
                                            element.url ||
                                            element.title
                                        }
                                    >
                                        <NewsItem
                                            title={element.title}
                                            description={element.description}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source?.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </InfiniteScroll>
                )}

                {!loading &&
                    !error &&
                    articles.length === 0 && (
                        <div className="alert alert-info text-center">
                            No news articles found.
                        </div>
                    )}
            </div>
        </>
    );
};

export default News;