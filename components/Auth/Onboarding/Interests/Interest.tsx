import TagSelectorList from "../TagSelector/TagSelectorList/TagSelectorList";
import TagSelector from "../TagSelector/TagSelector/TagSelector";
import Actions from "../Actions/Actions";

const Interests = () => {
  return (
    <>
      <TagSelectorList>
        <TagSelector title="Sports" active={false} />
        <TagSelector title="Sports" active={true} />
        <TagSelector title="Sports" active={true} />
        <TagSelector title="Sports" active={false} />
        <TagSelector title="Sports" active={true} />
        <TagSelector title="Sports" active={false} />
      </TagSelectorList>
      <Actions />
    </>
  );
};

export default Interests;
