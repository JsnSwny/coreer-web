import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Container from "@/components/Container/Container";
import ProfileCardList from "@/components/Card/ProfileCardList/ProfileCardList";
import ProfileCard from "@/components/Card/ProfileCard/ProfileCard";
import { server } from "@/config";
import { useRouter } from "next/router";
import { Profile } from "@/interfaces/profile.model";
import Section from "@/components/Layout/Section/Section";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import withAuth from "@/components/Route/withAuth";
import axios from "axios";
import SectionList from "@/components/Layout/SectionList/SectionList";
import ExploreHeading from "@/components/Layout/ExploreHeading/ExploreHeading";
import TopMatchBanner from "@/components/Banner/TopMatchBanner/TopMatchBanner";
import TopMatchBannerPlaceholder from "@/components/Banner/TopMatchBanner/TopMatchBannerPlaceholder";
import ProfileCardPlaceholder from "@/components/Card/ProfileCard/ProfileCardPlaceholder";

const Home = () => {
  const { userToken } = useAuth();

  const [recommendations, setRecommendations] = useState<(Profile | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
      };

      axios.get(`${server}/recommend/5`, config).then((res) => {
        setRecommendations(res.data.recommendations);
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>coreer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container>
          <ExploreHeading />
          <SectionList>
            <Section title={"Your top match"}>
              {!recommendations[0] ? (
                <TopMatchBannerPlaceholder />
              ) : (
                <TopMatchBanner profile={recommendations[0]} />
              )}
            </Section>

            <Section title={"Recommended for you"}>
              <ProfileCardList large={true}>
                {recommendations
                  .slice(1, 5)
                  .map((item) =>
                    !item ? (
                      <ProfileCardPlaceholder />
                    ) : (
                      <ProfileCard profile={item} />
                    )
                  )}
              </ProfileCardList>
            </Section>
          </SectionList>
        </Container>
      </main>
    </>
  );
};

export default withAuth(Home);
