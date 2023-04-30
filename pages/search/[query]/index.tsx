import { useRouter } from "next/router";
import axios from "axios";
import React, { useState } from "react";
import { server } from "@/config";
import Container from "@/components/Container/Container";
import ProfileCardList from "@/components/Card/ProfileCardList/ProfileCardList";
import ProfileCard from "@/components/Card/ProfileCard/ProfileCard";
import { Profile } from "@/interfaces/profile.model";
import SearchFilters from "@/components/Search/SearchFilters/SearchFilters";
import styles from "./index.module.scss";

interface resultsProps {
  searchData: any;
}

const results = ({ searchData }: resultsProps) => {
  const router = useRouter();
  const { query } = router.query;

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreResults, setHasMoreResults] = useState(false);

  return (
    <Container flex={true}>
      <SearchFilters />
      <ProfileCardList>
        {searchData.results.map((item: Profile) => (
          <ProfileCard profile={item} />
        ))}
      </ProfileCardList>
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  const { query, page = 1, perPage = 10 } = context.params;

  const encodedQuery = encodeURIComponent(query);

  const apiUrl = `${server}/api/user/?search=${encodedQuery}&page=${page}&perPage=${perPage}`;

  const response = await fetch(apiUrl);
  const searchData = await response.json();

  return {
    props: {
      searchData,
    },
  };
}

export default results;
