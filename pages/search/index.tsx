import { useRouter } from "next/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { server } from "@/config";
import Container from "@/components/Container/Container";
import ProfileCardList from "@/components/Card/ProfileCardList/ProfileCardList";
import ProfileCard from "@/components/Card/ProfileCard/ProfileCard";
import { Profile } from "@/interfaces/profile.model";
import SearchFilters from "@/components/Search/SearchFilters/SearchFilters";
import styles from "./index.module.scss";
import Pagination from "@/components/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import Head from "next/head";

interface SearchResult {
  results: Profile[];
  count: number;
}

interface ResultsProps {
  searchData: SearchResult;
  currentPage: number;
  perPage: number;
}

const results = ({ searchData, currentPage, perPage }: ResultsProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => {
    console.log("Start Loading");
    setLoading(true);
  };
  const stopLoading = () => {
    console.log("Stop Loading");
    setLoading(false);
  };

  const [currentPageState, setCurrentPage] = useState(currentPage);
  const [results, setResults] = useState(searchData);

  const pageCount = Math.ceil(searchData.count / 10);

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
    console.log(currentQuery.query);

    const apiUrl = `${server}/api/user/?search=${currentQuery.query}&page=${
      pageNumber.selected + 1
    }&perPage=10`;

    const response = await fetch(apiUrl);
    const searchData = await response.json();

    setResults(searchData);
    setLoading(false);
  };

  return (
    <Container flex={true}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <SearchFilters />

          <div className={styles.right}>
            <ProfileCardList>
              {results.results.map((item: Profile) => (
                <ProfileCard profile={item} />
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

results.getInitialProps = async (context: any) => {
  const { query, page = 1, perPage = 10 } = context.query;

  console.log(query, page, perPage);

  const encodedQuery = encodeURIComponent(query);

  const apiUrl = `${server}/api/user/?search=Test&page=10&perPage=10`;

  const response = await fetch(apiUrl);
  const searchData = await response.json();

  return {
    searchData,
    currentPage: parseInt(page),
    perPage: parseInt(perPage),
  };
};

export default results;
