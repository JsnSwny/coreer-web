import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { server } from "@/config";
import Container from "@/components/Container/Container";
import ProfileCardList from "@/components/Card/ProfileCardList/ProfileCardList";
import ProfileCard from "@/components/Card/ProfileCard/ProfileCard";
import { Profile } from "@/interfaces/profile.model";
import SearchFilters from "@/components/Search/SearchFilters/SearchFilters";
import styles from "./index.module.scss";
import Pagination from "@/components/Pagination/Pagination";
import Head from "next/head";
import withAuth from "@/components/Route/withAuth";

interface SearchResult {
	results: Profile[];
	count: number;
}

interface ResultsProps {
	searchData: SearchResult;
	currentPage: number;
	perPage: number;
	query: string;
}

const Results = ({ searchData, currentPage, perPage, query }: ResultsProps) => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [currentPageState, setCurrentPage] = useState(currentPage);
	const [results, setResults] = useState(searchData);

	const pageCount = Math.ceil(searchData.count / 15);

	useEffect(() => {
		setResults(searchData);
	}, [searchData]);

	const handlePageChange = async (pageNumber: any) => {
		const currentPath = router.pathname;
		const currentQuery = router.query;
		currentQuery.page = pageNumber.selected + 1;
		setCurrentPage(pageNumber.selected + 1);

		router.push(
			{
				pathname: currentPath,
				query: currentQuery,
			},
			undefined,
			{ shallow: true }
		);

		setLoading(true);

		const apiUrl = `${server}/api/user/?search=${currentQuery.query}&page=${
			pageNumber.selected + 1
		}&perPage=12`;

		const response = await fetch(apiUrl);
		const searchData = await response.json();

		setResults(searchData);
		setLoading(false);
	};

	return (
		<Container flex={true} margin size="large">
			<Head>
				<title>&quot;{query}&quot; | Search</title>
			</Head>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<div className={styles.right}>
						<h3 className={styles.title}>{results.count} Profiles Found</h3>
						<ProfileCardList className={styles.cardList} large={true}>
							{results.results.map((item: Profile) => (
								<ProfileCard profile={item} key={item.id} />
							))}
						</ProfileCardList>
						<Pagination
							pageCount={pageCount}
							onPageChange={handlePageChange}
							initialPage={currentPageState}
						/>
					</div>
				</>
			)}
		</Container>
	);
};

export const getServerSideProps = async (context: any) => {
	const { query, page = 1, perPage = 15 } = context.query;
	const encodedQuery = encodeURIComponent(query);

	const apiUrl = `${server}/api/user/?search=${query}&page=${page}&perPage=12`;

	const response = await fetch(apiUrl);
	const searchData = await response.json();

	return {
		props: {
			searchData,
			currentPage: parseInt(page),
			perPage: parseInt(perPage),
			query,
		},
	};
};

export default Results;
