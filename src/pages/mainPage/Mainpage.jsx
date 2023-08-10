import { useState, useRef, useEffect } from "react";
import maintext from "../../image/maintext.png";
import bird from "../../image/bird.png";
import flag from "../../image/flag.png";
import LocalPicks from "../recordPage/LocalPicks";
import {
  MainContainer,
  TextImage,
  Contents,
  TravelContainer,
  TravelTitle,
  Local,
  LocalTitle,
} from "./MainpageStyle";
import Buddy from "./Buddy";
import OneAndVoteAll from "./OneAndVote";

const data = [
  { id: 1, nickname: "User1" },
  { id: 2, nickname: "User2" },
];

const Mainpage = () => {
  const buddyDataArray = [
    { id: 1, text: "Data for Buddy 1" },
    { id: 2, text: "Data for Buddy 2" },
    { id: 3, text: "Data for Buddy 3" },
    { id: 4, text: "Data for Buddy 4" },
  ];

  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
        } else {
          setIsInViewport(false);
        }
      });
    };

    const options = { root: null, rootMargin: "290px", threshold: 0 };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <MainContainer>
      <TextImage className={isInViewport ? "frame-in" : ""} ref={ref}>
        <img src={maintext} alt="maintext" />
      </TextImage>
      <Contents>
        <OneAndVoteAll></OneAndVoteAll>

        <TravelContainer>
          <TravelTitle>
            <img src={bird} alt="bird" />
            <p>Finding Travel buddy</p>
          </TravelTitle>
          {buddyDataArray.map((item, index) => (
            <Buddy
              key={item.id}
              data={item.text}
              isEven={index === 1 || index === 3}
            />
          ))}
        </TravelContainer>

        <Local>
          <LocalTitle>
            <img src={flag} alt="flag" />
            <p>The secret of locals!</p>
          </LocalTitle>
          <span>
            <LocalPicks />
            <LocalPicks />
            <LocalPicks />
          </span>
        </Local>
      </Contents>
    </MainContainer>
  );
};

export default Mainpage;
