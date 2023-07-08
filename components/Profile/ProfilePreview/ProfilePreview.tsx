import TagsList from "@/components/Tags/TagsList/TagsList";
import styles from "./ProfilePreview.module.scss";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faMessage,
  faPaperPlane,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/interfaces/profile.model";
import ProfilePreviewSidebar from "./ProfilePreviewSidebar/ProfilePreviewSidebar";
import Projects from "../Projects/Projects/Projects";
import { Project } from "@/interfaces/project.model";
import { likeUser } from "@/utils/likeUser";
import { chatHrefConstructor } from "@/utils/chatHrefConstructor";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiPaperAirplane } from "react-icons/hi";
import { server } from "@/config";
import axios from "axios";
import { ConversationContext } from "@/contexts/ConversationContext";
import { useContext } from "react";
import { ImSpinner2 } from "react-icons/im";
import CardList from "@/components/Card/CardList/CardList";
import { differenceInMonths } from "date-fns";
import Card from "@/components/Card/Card/Card";
import DiscoverCard from "./DiscoverCard/DiscoverCard";

interface ProfilePreviewProps {
  profile: Profile;
  openProjectModal: (project: Project) => void;
  showLikeAnimation: boolean;
  isAnimationActive: boolean;
  setShowLikeAnimation: (value: boolean) => void;
  handleNextCard: () => void;
  handlePreviousCard: () => void;
  currentIndex: number;
}

const ProfilePreview = ({
  profile,
  openProjectModal,
  showLikeAnimation,
  isAnimationActive,
  setShowLikeAnimation,
  handleNextCard,
  handlePreviousCard,
  currentIndex,
}: ProfilePreviewProps) => {
  const { user, userToken, setUser } = useAuth();

  const [toggleMessageBar, setToggleMessageBar] = useState(false);
  const [message, setMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const { setConversations, conversations, addLike, removeLike, likes } =
    useContext(ConversationContext);

  useEffect(() => {
    ref.current && ref.current.focus();
    setToggleMessageBar(false);
  }, [profile]);

  const ref = useRef(null);

  return (
    <div
      key={profile.id}
      className={`${styles.container} ${
        isAnimationActive ? styles.scaleDown : styles.scaleUp
      }`}
      onKeyDown={(e) => {
        switch (e.code) {
          case "ArrowLeft":
            handlePreviousCard();
            break;
          case "ArrowRight":
            handleNextCard();
            break;
          default:
            break;
        }
      }}
      tabIndex={0}
      ref={ref}
    >
      <div className={styles.box}>
        {showLikeAnimation && (
          <div className={styles.likeAnimation}>
            <FontAwesomeIcon
              className={styles.likeAnimationIcon}
              icon={faCheck}
            />
          </div>
        )}
        <div className={styles.header}>
          <div className={styles.profile}>
            <img src={profile?.image} />
            <div>
              <h2>
                {profile?.first_name} {profile?.last_name}
              </h2>
              <p className={styles.level}>{profile?.current_level?.name}</p>
              {/* <p className={styles.location}>{profile?.location}</p> */}
            </div>
          </div>
          <div className={styles.navigation}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={`${styles.navigationIcon} ${
                currentIndex == 0 ? styles.iconDisabled : ""
              }`}
              onClick={handlePreviousCard}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className={`${styles.navigationIcon} ${
                currentIndex == 0 ? styles.iconDisabled : ""
              }`}
              onClick={handleNextCard}
            />
          </div>
        </div>
        <div
          className={`${styles.content} ${
            toggleMessageBar ? styles.contentOverlay : ""
          }`}
          onClick={() => setToggleMessageBar(false)}
        >
          {/* <ProfilePreviewSidebar profile={profile} /> */}
          <div className={styles.main}>
            {profile.bio && (
              <section className={styles.section}>
                <h3 className={styles.section__heading}>About</h3>
                <p>{profile.bio}</p>
              </section>
            )}

            <section className={styles.section}>
              <h3 className={styles.section__heading}>Skills</h3>
              <TagsList
                tags={profile!.languages.map((item) => ({
                  text: item.name,
                  highlight: user
                    ? user?.languages.some((lang) => item.id == lang.id)
                    : true,
                }))}
              />
            </section>
            <section className={styles.section}>
              <h3 className={styles.section__heading}>Interests</h3>
              <TagsList
                tags={profile!.interests.map((item) => ({
                  text: item.name,
                  color: item.interest_type == "C" ? "purple" : "orange",
                  highlight: user
                    ? user?.interests.some((interest) => item.id == interest.id)
                    : true,
                }))}
              />
            </section>

            {/* PROJECTS SECTION */}
            {profile.projects.length > 0 && (
              <section className={styles.section}>
                <h3 className={styles.section__heading}>Projects</h3>
                <Projects
                  projects={profile.projects}
                  action={() => {}}
                  isProfile
                  showEdit={user ? profile.id == user!.id : false}
                  openProjectModal={openProjectModal}
                  sortByEndDate
                />
              </section>
            )}

            {/* WORK EXPERIENCE SECTION */}
            {profile.work_experiences.length > 0 && (
              <section className={styles.section}>
                <h3 className={styles.section__heading}>Work Experience</h3>
                <CardList>
                  {profile?.work_experiences
                    .slice()
                    .sort((a, b) => {
                      const endDateA = a.end_date ? new Date(a.end_date) : null;
                      const endDateB = b.end_date ? new Date(b.end_date) : null;

                      return differenceInMonths(
                        endDateB || new Date(),
                        endDateA || new Date()
                      );
                    })
                    .map((experience) => (
                      <Card
                        key={experience.id}
                        image={null}
                        title={experience.job_title}
                        subtitle={experience.company}
                        body={experience.description}
                        start_date={experience.start_date}
                        end_date={experience.end_date}
                        size="large"
                        action={() => {}}
                        showEdit={false}
                      />
                    ))}
                </CardList>
              </section>
            )}

            {/* EDUCATION SECTION */}
            {profile.educations.length > 0 && (
              <section className={styles.section}>
                <h3 className={styles.section__heading}>Education</h3>
                <CardList>
                  {profile?.educations
                    .slice()
                    .sort((a, b) => {
                      const endDateA = a.end_date ? new Date(a.end_date) : null;
                      const endDateB = b.end_date ? new Date(b.end_date) : null;

                      return differenceInMonths(
                        endDateB || new Date(),
                        endDateA || new Date()
                      );
                    })
                    .map((education) => (
                      <DiscoverCard
                        key={education.id}
                        image={null}
                        title={education.school.name}
                        subtitle={education.degree}
                        body={education.description}
                        start_date={education.start_date}
                        end_date={education.end_date}
                        size="large"
                        action={() => {}}
                        showEdit={false}
                      />
                    ))}
                </CardList>
              </section>
            )}
          </div>
        </div>
        <div
          className={`${styles.messageBar} ${
            toggleMessageBar ? styles.messageBarActive : ""
          }`}
        >
          <textarea
            className={`${styles.messageBarTextarea}`}
            onClick={() => message.length > 0 && setToggleMessageBar(true)}
            value={message}
            onChange={(e) => {
              e.target.value.length == 0
                ? setToggleMessageBar(false)
                : setToggleMessageBar(true);

              setMessage(e.target.value);
            }}
            placeholder={`Start a conversation with ${profile.first_name}...`}
          ></textarea>
          <div
            className={styles.messageBarLikeWrapper}
            onClick={() => {
              if (message.length > 0) {
                setActionLoading(true);
                axios
                  .post(
                    `${server}/api/conversations/`,
                    {
                      name: chatHrefConstructor(user!, profile),
                    },
                    {
                      headers: {
                        Authorization: `Token ${userToken}`,
                      },
                    }
                  )
                  .then((res) =>
                    axios
                      .post(
                        `${server}/api/messages/`,
                        {
                          from_user_id: user!.id,
                          to_user_id: profile.id,
                          content: message,
                          conversation_id: res.data.id,
                        },
                        {
                          headers: {
                            Authorization: `Token ${userToken}`,
                          },
                        }
                      )
                      .then((messageRes) => {
                        setShowLikeAnimation(true);
                        setToggleMessageBar(false);
                        setMessage("");
                        const newConvo = {
                          ...res.data,
                          last_message: messageRes.data,
                        };

                        setConversations([newConvo, ...conversations]);
                        setTimeout(() => {
                          setShowLikeAnimation(false);
                          handleNextCard();
                        }, 900);
                        setActionLoading(false);
                      })
                  );
              } else {
                likes.some((item) => item.id == profile.id)
                  ? removeLike(profile.id)
                  : addLike(profile);
                const followList = likeUser(user!, profile, userToken!);

                setShowLikeAnimation(true);
                setTimeout(() => {
                  setShowLikeAnimation(false);
                  handleNextCard();
                }, 900);
              }
            }}
          >
            {actionLoading ? (
              <ImSpinner2 className={styles.spinner} />
            ) : (
              <FontAwesomeIcon
                className={styles.messageBarLike}
                icon={message.length > 0 ? faPaperPlane : faStar}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
